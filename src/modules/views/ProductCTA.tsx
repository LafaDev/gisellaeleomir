import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import Button from "../components/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const mapLink =
  "https://www.google.com/maps/place/Mundo+das+Festas+Sal%C3%A3o+de+Festa+e+Buffet/@-22.7769721,-43.3895722,14z/data=!4m6!3m5!1s0x9964414b83f8a9:0x5bb822db8e5d1708!8m2!3d-22.7942162!4d-43.3834819!16s%2Fg%2F12ltxh1b6?entry=ttu";

function ProductCTA() {
  return (
    <Container
      component="section"
      id="location"
      sx={{
        mt: 10,
        mb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Título com espaçamento responsivo */}
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          mt: { xs: 2, md: 10 }, // espaçamento responsivo
          textAlign: "center",   // centraliza o texto
          whiteSpace: "normal",  // garante que ele quebre naturalmente
          fontSize: { xs: "1.8rem", md: "2.5rem" }, // opcional: menor no mobile
          lineHeight: 1.2,
        }}
      >
        Onde vai acontecer
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        <b>Mundo das Festas – Salão de Festa e Buffet</b>
        <br />
        R. Inácio Serra, 83 – Vila Tiradentes, São João de Meriti – RJ
        </Typography>
      {/* Google Maps iframe com marcador */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 360, sm: 400, md: 900 },
          height: { xs: 190, sm: 280, md: 390 },
          mb: 3,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          mx: "auto",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.669176045576!2d-43.38529278450299!3d-22.794216217105816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9964414b83f8a9%3A0x5bb822db8e5d1708!2sMundo%20das%20Festas%20Sal%C3%A3o%20de%20Festa%20e%20Buffet!5e0!3m2!1sen!2sbr!4v1693409000000!5m2!1sen!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Local do Casamento"
        />
      </Box>

      {/* Botão único para abrir o mapa */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<LocationOnIcon />}
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ px: 5, py: 2 }}
      >
        Abrir no mapa
      </Button>
    </Container>
  );
}

export default ProductCTA;
