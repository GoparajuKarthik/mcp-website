import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

export default function Content() {

  const [caseData, setCaseData] = useState(null);
  const [searchParams] = useSearchParams();
  const kmrid = searchParams.get("kmrid")

  useEffect(() => {
    console.log("kmrid -", kmrid)
    axios.get(`https://remote-mcp-server-authless.prabhuchira.workers.dev/api/getarticle?kmrid=${kmrid}`)
        .then(res => {
          console.log(res.data,"RES DATA")
          if (res.data && res.data.article && res.data.article.length > 0) {
            setCaseData(res.data.article[0]);
          }
        })
        .catch(err => console.error(err));
  },[kmrid]);



  return (
    <div className="content">
      {caseData?.KmrTitle && <h2>{caseData?.KmrTitle}</h2>}
      {caseData?.KMRID && <p><strong>KMRID:</strong> {caseData?.KMRID}</p>}
      {caseData?.IssueDescription && <p><strong>Issue Description:</strong> {caseData?.IssueDescription}</p>}
      {<p><strong>Steps to Reproduce:</strong></p>}
      {caseData?.StepsToReproduce && <pre>{caseData?.StepsToReproduce}</pre>}
      {caseData?.RootCause && <p><strong>Root Cause:</strong> {caseData?.RootCause}</p>}
      {caseData?.Description && <p><strong>Description:</strong> {caseData?.Description}</p>}
      {caseData?.Solution && <p><strong>Solution:</strong> {caseData?.Solution}</p>}
      {caseData?.ReferencedINCS && <p><strong>Referenced INCS:</strong> {caseData?.ReferencedINCS}</p>}
      {/* {caseData?.BugItems && <p><strong>Bug Items:</strong> {caseData?.BugItems}</p>} */}
      {caseData?.Summary && <p><strong>Summary:</strong> {caseData.Summary}</p>}
        {caseData?.FixedInVersion && <p><strong>Fixed In Version:</strong> {caseData.FixedInVersion}</p>}
                {caseData?.FoundInVersion && <p><strong>Found In Version:</strong> {caseData.FoundInVersion}</p>}
    </div>
  );
}