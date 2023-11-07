import '../styles/Home.scss';
import { Banner } from './Banner';
import { Goal } from './Goal';
import chatIcon from '../assets/icon-chat.png';
import moneyIcon from '../assets/icon-money.png';
import securityIcon from '../assets/icon-security.png';

export function Home() {
    return (
        <section>
            <Banner />
            <div className='goals'>
                <Goal 
                    icon={chatIcon}
                    title="You are our #1 priority" 
                    description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." 
                />
                <Goal 
                    icon={moneyIcon}
                    title="More savings means higher rates" 
                    description="The more you save with us, the higher your interest rate will be!" 
                />
                <Goal 
                    icon={securityIcon} 
                    title="Security you can trust" 
                    description="We use top of the line encryption to make sure your data and money is always safe." 
                />
            </div>
        </section>
    );
}
