import { useState, useEffect } from "react";

function Qout({ qout }) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    console.log("qout received:", qout);
    if (qout?.data) {
      const formatted = formatQout(qout.data);
      console.log("formatted data:", formatted);
      setFormattedData(formatted);
    }
    return () => {
      setFormattedData([]);
    };
  }, [qout]);

  return (
    <div className="text-left w-[80%]">
      {formattedData.length > 0 ? (
        formattedData.map(({ id, heading, content }) => (
          <div key={id} className="text-left mb-1 text-sm">
            {heading && <h3 className="font-bold text-white">{heading}:</h3>}
            <p>{content}</p>
          </div>
        ))
      ) : (
        <p>⏳⏳⏳⏳</p>
      )}
    </div>
  );
}

function formatQout(response) {
  if (!response) return [];

  const kresponse = response.response.toString();
  console.log("formatquote response", kresponse);

  const sections = kresponse.split(/(?=-\s*\*\*|^\*\*)/m).filter(Boolean);

  return sections.map((section, index) => {
    const cleanSection = section.trim().replace(/^-\s*/, "");
    const headingMatch = cleanSection.match(/^\*\*(.*?):\*\*/);
    const content = cleanSection
      .replace(/^\*\*(.*?):\*\*/, "")
      .trim()
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return {
      id: index,
      heading: headingMatch ? headingMatch[1] : null,
      content: content,
    };
  });
}

export default Qout;
