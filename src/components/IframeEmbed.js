export default function IframeEmbed({ postfix, height }) {
  return (
    <iframe
      width="100%"
      height={height + "px"}
      src={`https://archive.0xcafe.news/${postfix}`}
      allow
      allowFullScreen
      sandbox
      style={{ backgroundColor: "white" }}
    />
  );
}
