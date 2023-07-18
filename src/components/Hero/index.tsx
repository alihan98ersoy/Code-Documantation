// Hero.tsx
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CreateIcon from "@mui/icons-material/Create";
import styles from "./styles.module.css";

import "./index.css";

import { Grid } from "@mui/material";

interface HeroProps {
  siteConfig: {
    title: string;
    tagline: string;
  };
}

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: JSX.Element; // added this to fix the error
}

const Card = ({ title, description, href, icon }: CardProps) => (
  <Link
    className="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module"
    href={href}
  >
    <Grid
      mb={2}
      container
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      className="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module"
    >
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <h2 title={title}>{title}</h2>
      </Grid>
    </Grid>
    <p
      className="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module"
      title=""
    >
      {description}
    </p>
  </Link>
);

export default function Hero({ siteConfig }: HeroProps): JSX.Element {
  const cards = [
    {
      title: "Tutorial",
      description:
        "Tutorial for different programming languages and frameworks, all in one place.",
      href: "/docs/tutorial/intro",
      icon: <LocalLibraryIcon />,
    },
    {
      title: "Exercises",
      description:
        "Exercises for different programming languages and frameworks.",
      href: "/docs/exercises/",
      icon: <FitnessCenterIcon />,
    },
    {
      title: "Blog",
      description:
        "Blog posts about different programming languages and frameworks, all in one place.",
      href: "/blog",
      icon: <CreateIcon />,
    },
  ];

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div >
          <section className="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
            {cards.map((card) => (
              <article
                key={card.title}
                className="col col--4 margin-bottom--lg"
              >
                <Card {...card} />
              </article>
            ))}
          </section>
        </div>
      </div>
    </header>
  );
}