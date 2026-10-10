import { ImageResponse } from "next/og";

export const alt =
  "SastaStore - Premium Digital Tools at Sasta Prices";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#08090c",
          color: "#f6f7f9",
          padding: "80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <span>Sasta</span>
          <span style={{ color: "#22c55e" }}>Store</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "70px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: 70,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-3px",
            }}
          >
            Premium Digital Tools
          </div>

          <div
            style={{
              fontSize: 70,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-3px",
              color: "#22c55e",
            }}
          >
            at Sasta Prices.
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: 27,
              color: "#9ca3af",
            }}
          >
            AI Tools • Premium Subscriptions • Software • Digital Services
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          sastastore.store
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}