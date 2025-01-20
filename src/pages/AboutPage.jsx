import Link from "../components/Link.jsx";

const AboutPage = () => {
  return (
    <section className={"flex grow flex-col items-center gap-8 p-10 py-10"}>
      <h1 className={"text-5xl"}>About</h1>
      <p className={"text-2xl"}>Clean your photos of light pollution</p>

      <p className={"text-2xl"}>
        <br />
        This app uses open source image manipulation library from
        <Link isExternal={true} href={"https://opencv.org/"}>
          OpenCV
        </Link>
        <br />
        Made by Matúš Čík <br />{" "}
        <Link isExternal={true} href={"mailto:matus.cik@protonmail.com"}>
          mail: matus.cik@protonmail.com
        </Link>
      </p>
    </section>
  );
};

export default AboutPage;
