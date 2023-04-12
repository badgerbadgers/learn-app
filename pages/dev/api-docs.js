import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

// adding a prop supportedSubmitMethods disables 'try it' button for not listed methods, 'try it out' button won't be shown
function ApiDoc({ spec, supportedSubmitMethods }) {
  return (
    <SwaggerUI spec={spec} supportedSubmitMethods={supportedSubmitMethods} />
  );
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API ",
        version: "1.0",
      },
    },
  });

  return {
    props: {
      spec,
      supportedSubmitMethods: ["get"],
    },
  };
};

export default ApiDoc;
