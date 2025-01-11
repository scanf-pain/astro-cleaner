import { useRef, useState } from "react";
import {
  createCanvas,
  loadUrlImgToCanvas,
  saveCanvas,
} from "../utils/htmlUtils.js";
import ImageLoader from "../components/ImageLoader.jsx";
import filterCanvas from "../filters/mainFilter.js";
import Viewport from "../components/Viewport.jsx";
import { flushSync } from "react-dom";
import LoadingOverlay from "../components/LoadingOverlay.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import {
  Button,
  Divider,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import SidePanel from "../components/SidePanel.jsx";

const Astrocleaner = () => {
  // app state
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // value of filters
  const filterValues = useRef({
    intensity: 1,
    brightness: 0,
    contrast: 1,
    gamma: 1,
  });

  // read/write canvas for openCv filtering
  const refSrcCanvas = useRef(createCanvas("Source image"));
  const refDestCanvas = useRef(createCanvas("Filtered image"));

  const proccessData = async (srcCanvas, destCanvas) => {
    await flushSync(() => {
      setIsProcessing(true);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await filterCanvas(srcCanvas, destCanvas, filterValues.current);

    await flushSync(() => {
      setIsProcessing(false);
    });
  };

  const handleUrlImgLoad = async (url) => {
    await loadUrlImgToCanvas(refSrcCanvas.current, url);
    URL.revokeObjectURL(url);
    setIsImgLoaded(true);

    proccessData(refSrcCanvas.current, refDestCanvas.current);
  };

  const applyFilters = async () => {
    proccessData(refSrcCanvas.current, refDestCanvas.current);
  };

  const onClickNewImage = () => {
    setIsImgLoaded(false);
  };

  return (
    <div className="relative flex max-h-screen grow flex-col overflow-clip">
      <SiteHeader
        childrenCenter={
          <NavbarContent className={"hidden md:flex"}>
            <NavbarItem>
              <Button
                onClick={() => onClickNewImage()}
                variant={"ghost"}
                className={!isImgLoaded && "hidden"}
              >
                New image
              </Button>
            </NavbarItem>
          </NavbarContent>
        }
        childrenEnd={
          <NavbarContent>
            <NavbarItem>
              <Button
                variant={"shadow"}
                color={"primary"}
                isDisabled={!isImgLoaded}
                onClick={() => saveCanvas(refDestCanvas.current)}
              >
                Export
              </Button>
            </NavbarItem>
          </NavbarContent>
        }
        childrenMenu={
          <NavbarMenuItem className={"flex flex-col"}>
            <Button
              variant={"ghost"}
              color={"primary"}
              onClick={() => onClickNewImage()}
              className={"my-6 items-center p-6 text-2xl"}
            >
              New image
            </Button>
            <Divider />
          </NavbarMenuItem>
        }
      />

      {isProcessing && <LoadingOverlay title={"Applying filters"} />}

      {isImgLoaded ? (
        <div
          className={
            "grid grow items-start md:grid-flow-col-dense md:items-stretch"
          }
        >
          <SidePanel
            disabled={isProcessing}
            filterValues={filterValues.current}
            onFilterChange={() => applyFilters()}
          />
          <Viewport
            sourceCanvas={refDestCanvas.current}
            disabled={isProcessing}
          />
        </div>
      ) : (
        <ImageLoader onImageUrlLoad={(url) => handleUrlImgLoad(url)} />
      )}
    </div>
  );
};

export default Astrocleaner;
