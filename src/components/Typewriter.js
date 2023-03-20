import TypeWriterEffect from "react-typewriter-effect";

function Typewriter() {
  return (
    <div className="mt-8 mx-auto">
      <TypeWriterEffect
        textStyle={{
          fontFamily: "PT Mono",
          color: "black",
          fontWeight: 200,
          fontSize: "16px",
        }}
        startDelay={2000}
        cursorColor="black"
        multiText={[
          "Steampunk or cyberpunk?",
          "Best investment instrument?",
          "Which DnD class is your favourite?",
          "What would your last meal be?",
          "Poll anything you want...",
        ]}
        multiTextDelay={3000}
        typeSpeed={60}
      />
    </div>
  );
}

export default Typewriter;
