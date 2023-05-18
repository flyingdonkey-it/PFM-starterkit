export const PlanetIllustrations = ({ hiddenOnMobile }) => {
  return (
    <div
      className={`absolute w-full h-screen bg-[url('/landing-page.png')] bg-cover ${
        hiddenOnMobile && 'hidden sm:flex'
      }`}
    />
  );
};
