import { Center, VStack } from "@chakra-ui/react";
import Registro from "./Registro";
const xpto = [
  {
    id: 1,
    vendedor: "Michael Jordan",
    dias: [{ dia1: "2", dia2: "0", dia3: "6" }]
  },
  {
    id: 2,
    vendedor: "Giannis Antetokoumpo",
    dias: [{ dia1: "2", dia2: "8", dia3: "6" }]
  }
];

//console.log(xpto);
export default function App() {
  const reg = xpto.map((i) => {
    return <Registro key={i.id} {...i} />;
  });

  return (
    <Center
      borderWidth="2px"
      borderColor="teal.100"
      width="80h"
      height="100vh"
      padding="10"
    >
      <VStack>{reg}</VStack>
    </Center>
  );
}
