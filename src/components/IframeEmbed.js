export default function IframeEmbed({ postfix }) {
  return (
    <iframe
      width="100%"
      height="800px"
      src={`https://archive.0xcafe.news/${postfix}`}
      allow
      allowFullScreen
      sandbox
    />
  );
}
