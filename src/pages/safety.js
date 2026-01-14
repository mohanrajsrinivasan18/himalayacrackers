import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import styles from "./safety.module.scss";

export default function SafetyTips() {
  const tips = [
    {
      icon: "👕",
      title: "Clothes and Shoes",
      content: "To avoid your clothes getting on fire, it is strictly advised to wear cotton clothes while bursting crackers. You mustn't wear synthetic clothes since they easily catch fire. You must also ensure that you wear covered shoes to prevent any feet injury."
    },
    {
      icon: "🧯",
      title: "Fire Extinguisher",
      content: "Always keep a fire extinguisher in the close proximity of the place where you are bursting crackers. You can also keep buckets of water and sand handy. In case of a fire accident, immediately inform the fire brigade."
    },
    {
      icon: "🎆",
      title: "Use Crackers Wisely",
      content: "Always purchase good quality crackers. Never burst crackers in any indoor place. Always find a proper outdoor setting to burst crackers. Light crackers at a distance from where people have gathered. Light one cracker at a time and after lighting it, keep a safe distance between yourself and the lighted cracker."
    },
    {
      icon: "🤝",
      title: "Be Sensitive",
      content: "As you know that crackers are responsible for air and noise pollution, hence avoid bursting them near hospitals or crowded public places. Always remember that your celebration should not be a reason of discomfort to others."
    },
    {
      icon: "♻️",
      title: "Dispose of Crackers Properly",
      content: "Once the cracker has been completely burnt, remember to dispose of it safely. Put them in a bucket of water or extinguish them by putting sand around them."
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Supervise and Instruct Children",
      content: "A very important safety tip for Diwali is to ensure that children play with crackers under adult supervision. You must instruct your kids about the usage of firecrackers and the proper ways of disposing them. Never should you allow any minor to play with crackers alone."
    },
    {
      icon: "🩹",
      title: "First Aid Kit",
      content: "Always keep a first aid kit handy. In case of minor burns or injuries, you can get immediate medical attention."
    },
    {
      icon: "🕯️",
      title: "Candles and Diyas",
      content: "It is during this time of the year that we decorate our houses with candles and diyas. Do ensure that the candles are away from curtains or other inflammable items at home."
    },
    {
      icon: "🐕",
      title: "Pet Safety",
      content: "Pets might find a difficult time with so much noise around. As a safety tip it is recommended that you keep your pets away from crackers."
    },
    {
      icon: "📢",
      title: "Spread Awareness",
      content: "Spread the safety tips among all the people around you, so that you can ensure a safe Diwali for all of them."
    }
  ];

  return (
    <>
      <SEO 
        title="Safety Tips | Himalaya Crackers" 
        description="Ensure a Safe Diwali with these important safety tips for bursting crackers. Stay safe and spread happiness."
      />
      
      <Header />
      
      <main className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Safety Tips</h1>
            <p className={styles.subtitle}>
              Essential safety guidelines for a safe and joyful Diwali celebration. Follow these tips to protect yourself and your loved ones.
            </p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.tipsGrid}>
            {tips.map((tip, index) => (
              <div key={index} className={styles.tipCard}>
                <div className={styles.tipIcon}>{tip.icon}</div>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipContent}>{tip.content}</p>
              </div>
            ))}
          </div>

          <div className={styles.footerBanner}>
            <div className={styles.bannerContent}>
              <h2>🪔 Celebrate Responsibly</h2>
              <p>
                Celebrate this festival of lights with great pomp and joy. 
                Stay Safe and Spread Happiness.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
