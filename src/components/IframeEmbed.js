export default function IframeEmbed({ postfix }) {
  return (
    <iframe
      width="100%"
      height="800px"
      src={`https://archive.0xcafe.news/${postfix}`}
      allow
      allowFullScreen
      sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation"
    />
  );
}
