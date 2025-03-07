/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Pcontext } from "../contexts/Pcontext";
import { currentConfig } from "../config/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Comments({ pin }) {
  const { comments, setComments } = useContext(Pcontext);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${currentConfig.apiUrl}/zipscomments`,
          {
            params: {
              zipcode: pin,
            },
          }
        );
        console.log("read comments", response);
        setComments(response.data.zipscomments1 || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-start items-start h-[500px] overflow-auto">
      <div className="border-2 border-amber-900/90 rounded-lg text-sm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border-2 border-amber-300 rounded-lg text-sm
            focus:outline-none focus:border-amber-500 bg-white/90"
          rows={3}
        />
        <button
          type="submit"
          className="bg-amber-700/60 hover:bg-amber-500 text-black 
            p-1 text-sm rounded-sm transition-colors w-fit cursor-pointer"
          onClick={async () => {
            try {
              await axios.post(`${currentConfig.apiUrl}/zipscomments`, {
                zipcode: pin,
                comment: newComment,
              });
              toast.success("Comment submitted successfully", {
                autoClose: 1000,
              });
              const routput = await axios.get(
                `${currentConfig.apiUrl}/zipscomments`,
                {
                  params: {
                    zipcode: pin,
                  },
                }
              );
              console.log("routput", routput);
              // eslint-disable-next-line no-unused-vars
              setComments((ccomments) => {
                const ncomments = [...routput.data.zipscomments1];
                return ncomments; // Return the new comments
              });
              setNewComment("");
            } catch (error) {
              console.error("Error submitting comment", error);
              toast.error("Error submitting comment");
            }
          }}
        >
          Submit Comment
        </button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="border-2 border-amber-900/10 
            rounded-lg text-sm p-2 w-[98%] text-left bg-amber-500/40 shadow-lg hover:bg-amber-100/60 
            transition-colors duration-300"
          >
            <p>{comment.comment}</p>
            <span className="text-[10px] text-gray-600 ml-2">
              {new Date(comment.createdAt).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
              &nbsp;
              <span
                title="Delete Comment"
                data-commentid={comment._id}
                className="text-red-500 cursor-pointer"
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this comment?"
                    )
                  ) {
                    try {
                      const dinfo = await axios.delete(
                        `${currentConfig.apiUrl}/zipscomments`,
                        {
                          params: {
                            id: comment._id,
                          },
                        }
                      );
                      if (dinfo.status === 200) {
                        toast.success("Comment deleted successfully");
                        setComments((ccomments) =>
                          ccomments.filter((c) => c._id !== comment._id)
                        );
                      } else {
                        toast.error("Error deleting comment");
                      }
                    } catch (error) {
                      console.error("Error deleting comment", error);
                      toast.error("Error deleting comment", {
                        autoClose: 1000,
                      });
                    }
                  }
                }}
              >
                ❌
              </span>
            </span>
          </div>
        ))
      ) : (
        <div></div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Comments;
