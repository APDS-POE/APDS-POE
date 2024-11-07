import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0A1A2F", // Darker background for contrast
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#4CAF50", "#00C0FF", "#FFC107"], // Green, blue, yellow for currency-like colors
        },
        links: {
          color: "#888",
          distance: 180,
          enable: true,
          opacity: 0.5,
          width: 2.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: ["circle", "polygon"], // Circles and polygons for variation
          polygon: {
            sides: 6, // Can represent network nodes or currency symbols
          },
        },
        size: {
          value: { min: 3, max: 6 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
