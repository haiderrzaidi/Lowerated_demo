import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Image from "next/image";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
    }}
  >
    {[...Array(totalSteps)].map((_, index) => (
      <Box
        key={index}
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: index <= currentStep ? "primary.main" : "grey.300",
          mx: 1,
        }}
      />
    ))}
  </Box>
);

interface PopupContentProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onClose?: () => void;
  imageSrc: string;
}

const PopupContent: React.FC<PopupContentProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onClose,
  imageSrc,
}) => (
  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Box sx={{ flex: 1, p: 4, textAlign: "left" }}>
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <Button
          onClick={currentStep === totalSteps - 1 ? onClose : onNext}
          variant="contained"
          sx={{
            borderRadius: "10px",
            px: 4,
            boxShadow: 3,
            background:
              "linear-gradient(45deg, rgba(27,30,106,1), rgba(27,31,138,1))",
            color: "#fff",
            "&:hover": {
              background:
                "linear-gradient(45deg, rgba(27,31,138,1), rgba(27,30,106,1))",
            },
          }}
        >
          {currentStep === totalSteps - 1 ? "Get Started" : "Next"}
        </Button>
      </Box>
    </Box>
    <Box sx={{ flex: 1, p: 4 }}>
      <Image
        src={imageSrc}
        alt=""
        width={500}
        height={500}
        style={{ borderRadius: "10px" }}
      />
    </Box>
  </Box>
);

interface StepProps {
  onNext: () => void;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
}

const CreateMagic: React.FC<StepProps> = ({
  onNext,
  currentStep,
  totalSteps,
}) => (
  <PopupContent
    onNext={onNext}
    currentStep={currentStep}
    totalSteps={totalSteps}
    imageSrc="/assets/logo/svgs/logo_black_box.svg"
  >
    <Typography variant="h4" component="h2" gutterBottom>
      Let&apos;s Create Magic Together
    </Typography>
    <Typography variant="body1">
      Your story awaits on Lowerated Writer. Explore features and bring your
      ideas to life!
    </Typography>
  </PopupContent>
);

// Define similar components for GenerateIdeas, WriteBestseller, CraftScreenplay

interface SignupPopupsProps {
  open: boolean;
  handleClose: () => void;
}

const SignupPopups: React.FC<SignupPopupsProps> = ({ open, handleClose }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const nextStep = () => setStep(step + 1);

  const components: React.ReactNode[] = [
    <CreateMagic
      key="create-magic"
      onNext={nextStep}
      onClose={handleClose}
      currentStep={step}
      totalSteps={totalSteps}
    />,
    // Define similar JSX elements for other steps
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="signup-popup-title"
      aria-describedby="signup-popup-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 4,
        }}
      >
        {components[step]}
      </Box>
    </Modal>
  );
};

export default SignupPopups;
