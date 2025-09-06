import * as React from "react";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ProductCTA from "./modules/views/ProductCTA";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import Info from "./modules/views/Info";
import Casal from "./modules/views/Casal";

import { Fab, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Index() {
  const [showScroll, setShowScroll] = React.useState(false);
  const casalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = casalRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show the FAB when Casal is NOT visible (scroll past ProductHero)
          const entryValue = entry.isIntersecting;
          setShowScroll(!entryValue);
        });
      },
      {
        threshold: 0.1, // trigger when ~10% of Casal is visible
      }
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
      <ProductValues />
      <ProductCTA />

      {/* Scroll-to-top Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 90, sm: 50 },
          right: { xs: 10, sm: 70 },
          opacity: showScroll ? 1 : 0,
          transition: "opacity 0.15s",
          pointerEvents: showScroll ? "auto" : "none", // prevents clicks when hidden
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

