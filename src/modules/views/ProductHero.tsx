import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from "/src/images/vista.jpeg";

// 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

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
        backgroundColor: '#6096a3', // Average color of the background image.
        backgroundPosition: 'center',
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
          fontFamily: "'Otegan', cursive",
        }}
      >
        Gisella e Leomir
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: { xs: 10, sm: 10, md: 2 }, mt: { xs: 2, sm: 2 } }}
      >
        convidam você para a celebração de sua união.
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
        size='large'
        component="a"
        sx={{
          minWidth: 200,
          mt: { xs: 4, md: 0 },
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
