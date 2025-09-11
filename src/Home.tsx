import * as React from "react";
import { useParams } from "react-router-dom";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ProductCTA from "./modules/views/ProductCTA";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import Info from "./modules/views/Info";
import Casal from "./modules/views/Casal";
import ProductCategories from "./modules/views/ProductCategories";

import { Fab, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Index() {
  const [showScroll, setShowScroll] = React.useState(false);
  const casalRef = React.useRef<HTMLDivElement | null>(null);

  // 👇 get guestName from the URL
  let { guestName } = useParams<{ guestName: string }>();

  React.useEffect(() => {
    const element = casalRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowScroll(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const element = document.getElementById("AllTop");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <React.Fragment>
      <div ref={casalRef}>
        <AppAppBar />
        <div id="AllTop" />
        <ProductHero />
        <ProductHowItWorks />
      </div>

      <Casal />
      <Info />

      {/* 👇 pass guestName down */}
      <ProductValues guestName={guestName} />

      <ProductCategories />
      <ProductCTA />

      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 90, sm: 50 },
          right: { xs: 10, sm: 70 },
          opacity: showScroll ? 1 : 0,
          transition: "opacity 0.15s",
          pointerEvents: showScroll ? "auto" : "none",
        }}
      >
        <Fab
          size="small"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            backgroundColor: "#9A84B7",
            "&:hover": { backgroundColor: "#836FA1" },
            color: "white",
            "&:focus": { outline: "none" },
          }}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </Fab>
      </Box>
    </React.Fragment>
  );
}

export default withRoot(Index);