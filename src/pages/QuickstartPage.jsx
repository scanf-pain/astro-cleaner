import { Image } from "@nextui-org/react";

const QuickstartPage = () => {
  return (
    <section
      id={"quickstart"}
      className={"flex max-w-xl flex-col items-center justify-center p-8"}
    >
      <h1 className={"mt-12 text-5xl"}>Quickstart guide</h1>
      <ol
        className={
          "flex list-decimal flex-col gap-12 p-8 text-4xl leading-loose"
        }
      >
        <li>
          <h2>Upload your image</h2>
          <Image src={"/guide/guide-select.jpg"} />
        </li>
        <li>
          <h2>Tweak</h2>
          <div className={"flex gap-6"}>
            <Image src={"guide/guide-filter-1.jpg"} />
            <Image src={"guide/guide-filter-2.jpg"} />
          </div>

          <p className={"text-2xl"}>
            <b>Intensity</b> is the strength of light pollution filter.
          </p>
        </li>
        <li>
          <h2>Export</h2>
          <Image src={"guide/guide-export.jpg"} />
        </li>
      </ol>
    </section>
  );
};

export default QuickstartPage;
