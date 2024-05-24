export default function IframeEmbed({ postfix }) {
  return (
    <iframe
      width="100%"
      height="800px"
      src={`https://archive.0xcafe.news/${postfix}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      sandbox="allow-same-origin allow-popups allow-modals allow-scripts allow-top-navigation"
    />
  );
}
