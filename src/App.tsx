import { FC, useEffect, useMemo, useState } from "react";
import "./App.css";

const White: FC = ({ children }) => {
  return <span className="c-white">{children}</span>;
};
const Red: FC = ({ children }) => {
  return <span className="c-red">{children}</span>;
};
const Orange: FC = ({ children }) => {
  return <span className="c-orange">{children}</span>;
};
const Yellow: FC = ({ children }) => {
  return <span className="c-yellow">{children}</span>;
};
const Aqua: FC = ({ children }) => {
  return <span className="c-aqua">{children}</span>;
};
const Green: FC = ({ children }) => {
  return <span className="c-green">{children}</span>;
};
const Blue: FC = ({ children }) => {
  return <span className="c-blue">{children}</span>;
};
const Purple: FC = ({ children }) => {
  return <span className="c-purple">{children}</span>;
};

const Colors = [Red, Orange, Yellow, Green, Aqua, Blue, Purple];

function App() {
  const [srcUrl, setSrcUrl] = useState("");
  const [json, setJson] = useState("");
  const [err, setErr] = useState<Error | null>(null);
  const colorized = useMemo(
    () =>
      json.split("").map((char, index) => {
        switch (char) {
          case " ":
            return <span key={index}>{char}</span>;
          case '"':
            return <White key={index}>{char}</White>;
          default: {
            const Color = Colors[index % 7];
            return <Color key={index}>{char}</Color>;
          }
        }
      }),
    [json]
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setSrcUrl(hash);
    }
  }, []);

  useEffect(() => {
    if (!srcUrl) {
      return;
    }
    void fetch(srcUrl)
      .then((resp) => resp.json())
      .then((json) => setJson(JSON.stringify(json, null, 2)))
      .catch((err) => setErr(err));
  }, [srcUrl]);

  return (
    <div className="App">
      {json ? (
        <pre>
          <code>{colorized}</code>
        </pre>
      ) : (
        <p>Set JSON URL to URL hash of this page.</p>
      )}
      {err && <div>Error: {err.message}</div>}
    </div>
  );
}

export default App;
