import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from "/src/images/landing.jpeg";

export default function ProductHero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#6096a3",
        backgroundRepeat: "no-repeat",
        backgroundSize: "240%",
        backgroundPosition: "50% 0%",
        transition: "background-size 8s ease, background-position 8s ease",
        "&:hover": {
          backgroundSize: "150%",
          backgroundPosition: "40% 50%",
        },
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{
          mt: { xs: 27.5, sm: 2 },
          fontFamily: `"Cinzel", serif !important`,
          fontWeight: 400,
          fontSize: "clamp(2.0rem, 5vw, 3rem)", 
          textTransform: "uppercase"
        }}
      >
        Leomir e Gisella 
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={
          { 
            fontFamily: "Quicksand",
            mt: { xs: 2, sm: 2 },
            fontWeight: 'bold',
            textTransform: "uppercase"
          }
        }
      >
        18 de outubro de 2025
      </Typography>
      
      <Typography
        color="inherit"
        align="center"
        variant="h6"
        sx={
            { 
              fontFamily: "Quicksand",
              fontSize: 14,
              mb: { xs: 2, sm: 10, md: 2 },
              mt: { xs: 2, sm: 2 },
              fontWeight: 100,
              textTransform: "uppercase"
            }
          }
      >
        RIO DE JANEIRO
      </Typography>
      
      {/* <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200, mt: 9 }}
      >
        Confirme sua presença.
      </Button> */}
      <Button
        color="secondary"
        variant="contained"
        size='small'
        component="a"
        sx={{
          backgroundColor: "#9A84B7",
          color: "white",
          minWidth: 200,
          mt: { xs: 2.5, md: 0 },
          textTransform: "none",
          fontWeight: "bold",
          px: { xs: 3, md: 0 },
        }}
        onClick={() => handleScrollTo("confirmation")}
      >
        Confirme sua presença.
      </Button>
      {/* <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Confirme sua presença.
      </Typography> */}
    </ProductHeroLayout>
  );
}
