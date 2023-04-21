import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

// adding a prop supportedSubmitMethods disables 'try it' button for not listed methods, 'try it out' button won't be shown, see docs https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ 'Network' table 'supportedSubmitMethods'
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
        title: "Learn App API",
        version: "1.0",
      },
    },
    apiFolder: "pages/api/v1",
  });

  return {
    props: {
      spec,
      supportedSubmitMethods: ["get"],
    },
  };
};

export default ApiDoc;
