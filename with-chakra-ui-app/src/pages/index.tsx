import {
  Link as ChakraLink,
  Text,
  Code,
} from '@chakra-ui/react'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
// import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { Fund } from '../components/Fund'
import { useEffect, useState } from 'react'
import { getETHPrice, getWEIPriceInUSD } from "../../lib/getETHPrice";
import factory from "../../smart-contract/factory";
import Campaign from "../../smart-contract/campaign";


export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  console.log(campaigns);

  return {
    props: { campaigns },
  };
}

const Index = ({ campaigns }) => {
  console.log("hello")
  const [campaignList, setCampaignList] = useState([]);
  const [ethPrice, updateEthPrice] = useState(null);

  async function getSummary() {
    try {
      const summary = await Promise.all(
        campaigns.map((campaign, i) =>
          Campaign(campaigns[i]).methods.getSummary().call()
        )
      );
      const ETHPrice = await getETHPrice();
      updateEthPrice(ETHPrice);
      console.log("summary ", summary);
      setCampaignList(summary);

      return summary;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);

   return(
   <Container height="100vh">
    <Hero />
    {/* <Main> */}
    
      <Text color="text">
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
        <Code>TypeScript</Code>.
      </Text>
      
      <Fund campaigns={campaigns} ethPrice={ethPrice} campaignList={campaignList}/>
    {/* </Main> */}
    
    <DarkModeSwitch />
    
    <Footer>
      <Text>Next ❤️ Chakrass</Text>
    </Footer>
    <CTA />
    
  </Container>
)
   }
export default Index
