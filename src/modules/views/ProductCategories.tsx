import { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// gifts hardcoded
import gift1 from "/src/images/gifts/gift1.jpeg";
import gift2 from "/src/images/gifts/gift2.jpeg";
import gift3 from "/src/images/gifts/gift3.jpeg";
import gift4 from "/src/images/gifts/gift4.jpeg";
import gift5 from "/src/images/gifts/gift5.jpeg";
import gift6 from "/src/images/gifts/gift6.jpeg";
import gift7 from "/src/images/gifts/gift7.jpeg";
import gift8 from "/src/images/gifts/gift8.jpeg";
import gift9 from "/src/images/gifts/gift9.jpeg";
import gift10 from "/src/images/gifts/gift10.jpeg";
import gift11 from "/src/images/gifts/gift11.jpeg";
import gift12 from "/src/images/gifts/gift12.jpeg";
import gift13 from "/src/images/gifts/gift13.jpeg";
import gift14 from "/src/images/gifts/gift14.jpeg";

const gifts = [
  { id: 1, title: "Ferro de Passar", price: "R$ 150,00", description: "Ferro de Passar a Seco Black Decker VFA1110TM2 com Base de Alumínio - 110V.", image: gift1, paymentCode: "PANELAS123" },
  { id: 2, title: "Jogo de cama", price: "R$ 130,00", description: "Jogo de Cama Queen Marcelino Textil Microfibra 170 Fios Ternura Bege e Branco 6 Peças.", image: gift2, paymentCode: "PANELAS123" },
  { id: 3, title: "Kit Travesseiros", price: "R$ 79,90", description: "Kit com 02 Travesseiros Regulagem de Altura - 70cm x 50cm - Travesseiro Matelado - Marias Enxoval.", image: gift3, paymentCode: "PANELAS123" },
  { id: 4, title: "Panela de Pressão", price: "R$ 150,00", description: "Panela de Pressão 4,5L Panelux Magnific em Alumínio com Antiaderente PTFE - Grafite.", image: gift4, paymentCode: "PANELAS123" },
  { id: 5, title: "Jogo De Banheiro", price: "R$ 55,00", description: "Jogo De Banheiro 3 Peças Cronos Pratatêxtil Antiderrapante Pelo baixo fácil de limpar.", image: gift5, paymentCode: "PANELAS123" },
  { id: 6, title: "Tapete", price: "R$ 135,00", description: "Tapete Sala Felpudo Peludo Marrom 200 X 240 CM.", image: gift6, paymentCode: "PANELAS123" },
  { id: 7, title: "Jogo de Facas", price: "R$ 78,99", description: "KIT Jogo Facas Tramontina Plenus 9 Peças Cutelo, Chef, Santoku, Pão, Tomate + Facas para Frutas e Legumes.", image: gift7, paymentCode: "PANELAS123" },
  { id: 8, title: "Assadeiras", price: "R$ 39,99", description: "Kit 3 Formas Assadeiras Redonda Alta 15-20-25 Alumínio.", image: gift8, paymentCode: "PANELAS123" },
  { id: 9, title: "Toalha de banho", price: "R$ 139,99", description: "Kit toalha de banho 2 peças + toalha de rosto 2 peças Eloa extra soft cinza | Buddemeyer.", image: gift9, paymentCode: "PANELAS123" },
  { id: 10, title: "Prendedores de Roupa", price: "R$ 34,99", description: "Kit 120 Prendedores de Roupa Reforçados Cores Sortidas.", image: gift10, paymentCode: "PANELAS123" },
  { id: 11, title: "Extensão Régua", price: "R$ 74,00", description: "Extensão Régua 6 Tomadas Luatek Diversos Tamanhos.", image: gift11, paymentCode: "PANELAS123" },
  { id: 12, title: "Ventilador", price: "R$ 200,00", description: "Ventilador de Mesa Arno Xtreme Force VB40 40cm com 3 Velocidades e 6 Pás – Preto - 110V.", image: gift12, paymentCode: "PANELAS123" },
  { id: 13, title: "Poltronas", price: "R$ 615,00", description: "Kit 02 Poltronas Decorativas Opala Suede Porto Decor Cor Marrom", image: gift13, paymentCode: "PANELAS123" },
  { id: 14, title: "Kit 50 Cabides", price: "R$ 39,90", description: "Kit 50 cabides para roupas REFORÇADOS - Cabide Adulto Redondo Preto ", image: gift14, paymentCode: "PANELAS123" },
];

export default function WeddingGifts() {
  const [open, setOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [copySnackOpen, setCopySnackOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleOpen = (gift: any) => {
    setSelectedGift(gift);
    setOpen(true);
    setMessage("");
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedGift(null);
  };
  const handleCopyCode = () => {
    if (selectedGift?.paymentCode) {
      // navigator.clipboard.writeText(selectedGift.paymentCode);
      navigator.clipboard.writeText("21992113923");
      setCopySnackOpen(true);
    }
  };
  const handleConfirm = () => {
    handleCopyCode();
    setOpen(false);
    setConfirmationOpen(true);
  };
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Container id="gifts" component="section" sx={{ mt: 8, mb: 1 }}>
      < br/>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontSize: 25.5,
          fontFamily: "Cinzel",
          fontWeight: "400",
          mb: 4,
          textTransform: "uppercase",
          color: "#757472"
        }}>
        Sugestões de Presentes
      </Typography>

      {/* Carousel with arrows */}
      <Box sx={{ position: "relative" }}>
        <Button
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            top: "40%",
            left: 0,
            zIndex: 10,
            bgcolor: "#fff",
            borderRadius: "50%",
            minWidth: 0,
            width: 36,
            height: 36,
            boxShadow: 2,
          }}
        >
          <ArrowBackIosIcon />
        </Button>

        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {gifts.map((gift) => (
            <Card
              key={gift.id}
              sx={{
                minWidth: 280,
                maxWidth: 280,
                flex: "0 0 auto",
                borderRadius: 3,
                boxShadow: 4,
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={gift.image}
                alt={gift.title}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent sx={{ flexGrow: 1, minHeight: 140, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  noWrap
                  sx={{ 
                    fontFamily: "Quicksand",
                    textTransform: "uppercase",
                    color: "#4F4A4A",
                  }}>
                  {gift.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: 12,
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "Quicksand",
                    color: "#4F4A4A",
                  }}
                >
                  {gift.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                    textTransform: "uppercase",
                    color: "#4F4A4A",
                  }}>
                  {gift.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    fontSize: 20,
                    bgcolor: "#9A84B7",
                    fontFamily: "Quicksand",
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#7B6993" },
                    "&:focus": { outline: "none" },
                  }}
                  onClick={() => handleOpen(gift)}
                >
                  Presentear
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Button
          onClick={scrollRight}
          sx={{
            position: "absolute",
            top: "40%",
            right: 0,
            zIndex: 10,
            bgcolor: "#fff",
            borderRadius: "50%",
            minWidth: 0,
            width: 36,
            height: 36,
            boxShadow: 2,
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>

      {/* Gift Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedGift && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "Quicksand",
                textTransform: "uppercase",
                color: "#4F4A4A",
              }}>
              {selectedGift.title}
              <IconButton onClick={handleClose} size="large">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                component="img"
                src={selectedGift.image}
                alt={selectedGift.title}
                sx={{ width: "100%", borderRadius: 2, mb: 2, boxShadow: 3 }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontFamily: "Quicksand",
                  color: "#4F4A4A",
                }}
              >
                {selectedGift.description}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  fontFamily: "Quicksand",
                  textTransform: "uppercase",
                  color: "#4F4A4A",
                }}>
                {selectedGift.price}
              </Typography>
              <TextField
                label="Código de pagamento - PIX EMAIL"
                value="leomirgisella2025@gmail.com"
                // value={selectedGift.paymentCode}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton edge="end" aria-label="copy" onClick={handleCopyCode} size="large">
                      <ContentCopyIcon />
                    </IconButton>
                  ),
                }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mensagem para os noivos"
                placeholder="Escreva uma mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                minRows={3}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
              <Button
                variant="contained"
                disabled={!message.trim()}
                onClick={handleConfirm}
                sx={{
                  "&:focus": { outline: "none" },
                }}
              >
                Confirmar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 4,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#9A84B7", mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Presente registrado!
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Obrigado pelo carinho 💜
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={() => setConfirmationOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Copy Snackbar */}
      <Snackbar
        open={copySnackOpen}
        autoHideDuration={2500}
        onClose={() => setCopySnackOpen(false)}
        message="Código copiado para a área de transferência"
      />
    </Container>
  );
}
