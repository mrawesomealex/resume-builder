<template>
    <div class="container-fluid">
       <unreg-head></unreg-head> 
       <div id="message" class="row">
          <div class="container">
            <h1 class="mb-4 col-12 px-0">Условия пользования</h1> 
            <p id="date">Принято 11.01.2018</p>
            <p>This User Agreement (this “Agreement”) is a contract between you (“you” or “User”) and Upwork Global Inc. 
               (“Upwork”, “we,” or “us”) and, to the extent expressly stated, our affiliates Upwork Escrow Inc. (“Upwork Escrow”) and Elance Limited.  
               You must read, agree to, and accept all of the terms and conditions contained in this Agreement 
               in order to use our website located at www.upwork.com, all affiliated websites, including mobile websites and applications, owned and operated by us,
               our predecessors or successors in interest, or our Affiliates (collectively, the “Site”), all services (except the Freelancer Services), 
               applications and products that are accessible through the Site and all Upwork mobile applications that link to or reference this Agreement (“Site Services”) whether provided by us or our Affiliates.  
               This Agreement includes and hereby incorporates by reference the following: Upwork Fee Agreement; Terms of Use; Cookie Policy; Privacy Policy; Freelancer Membership Agreement; Upwork Payroll Agreement; 
               Proprietary Rights Infringement Reporting Procedures; “Upwork Team” Software License Agreement; API Terms of Use; Upwork Widget Terms of Use; Hourly, Bonus, and Expense Payment Agreement with Escrow Instructions; 
               and Fixed-Price Escrow Instructions, as such agreements may be in effect and modified by Upwork from time to time (collectively, with this Agreement, the “Terms of Service”). 
               <br>The Terms of Service are available at www.upwork.com/legal/terms/.Subject to the conditions set forth herein, Upwork may, in its sole discretion, amend this 
               Agreement and the other Terms of Service at any time by posting a revised version on the Site and will provide reasonable advance notice of any amendment that includes a Substantial Change.  
               If the Substantial Change includes an increase to Fees charged by Upwork, Upwork will provide at least 30 days’ advance notice of the change,
               but may not provide any advance notice for changes resulting in a reduction in Fees or any temporary or promotional Fee change. 
               Any revisions to the Terms of Service will take effect on the noted effective date or when posted if there is no noted effective date (each, as applicable, the “Effective Date”).
            </p>
          </div>
        </div>
    </div>    
</template>

<script>
import UnregHead from '@/components/UnregHead'
export default {
  name: 'terms',
  components: {
    UnregHead
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

h1 {
  padding-top: 15vh;  
  font-family: $Playfair;
  font-weight: 700;
  font-size: 2.7vw;
  transition: 0.3s;
}
#date {
  font-family: $Roboto;
  font-weight: 500;
  color: $active;
}
@media (max-width: 1500px) {
  p,
  p > a {
    font-size: 1.2vw;
  }
}
@media (max-width: 990px) {
        h1 {
      font-size: 3.4vw;
    }
      p,
  p > a {
    font-size: 1.5vw;
  }
}
@media (max-width: 767px) {
  #message{ 
      font-size: 4vw;
    h1 {
      padding-top: 5vh; 
      font-size: 6vw;
    }
    }
  p,
  p > a {
    font-size: 2.3vw;
  }
}
@media (max-width: 570px) {
    #message{
      padding-top: 30px; 
    }
   h1 {
      margin-top: 5vh;
      font-size: 5.5vw;
    }
      p,
  p > a {
    font-size: 3.4vw;
  }
}
</style>