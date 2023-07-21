import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

// Extract the landing component into a separate file
import Landing from "@site/src/components/CodeEditor/Landing";

export default function CodeEditor(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <Landing />
      </main>
    </Layout>
  );
}
