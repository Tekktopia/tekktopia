import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

const BlogContent = () => {
  const { id } = useParams();
  const blog = blogData[parseInt(id) - 1];
  const url = 'https://tekktopia.com';

  return (
    <div className="mt-36 lg:px-16 sm:px-8 px-6 flex flex-col gap-16 w-full max-w-7xl">
      {/* Breadcrumb */}
      <h5 className="text-[14px]">
        <a href="/blog">
          <span className="text-[#28252480]">Blog &gt;</span>
        </a>{' '}
        {blog.title}
      </h5>

      {/* Blog Header */}
      <div className="mx-auto flex flex-col w-full lg:px-12 gap-4">
        <h5 className="font-medium text-[24px] sm:text-[32px] lg:text-[50px]">
          {blog.title}
        </h5>
        <p>
          <span className="text-[#2D5283] text-[14px] italic">
            By {blog.author}
          </span>{' '}
          - {blog.date}
        </p>
        <p className="text-[#697D95]">Share this publication</p>
        <div className="flex gap-4 text-xl">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${url}/blog/${id}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${url}/blog/${id}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${url}/blog/${id}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          {/* <a href={blog.socialLinks.instagram} target="_blank" rel="noreferrer">
            <FaInstagram />
          </a> */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + `${url}/blog/${id}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div>
        <img src={blog.image} alt="blog visual" className="w-full" />
      </div>
      {/* Blog Sections */}
      <div className="flex flex-col gap-24 lg:px-12">
        {blog.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-medium text-[16px]">{section.heading}</h3>
            <p className="text-[14px] leading-[24px] text-[#697D95]">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;

const blogData = [
  {
    title:
      'AI content detection in the emerging information ecosystem: new obligations for media and tech companies',
    author: 'Alistair Knott,  Dino Pedreschi, Toshiya Jitsuzumi, Susan Leavy',
    date: 'August 5, 2024',
    image: '/ai-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',
    sections: [
      {
        content: `The world is about to be swamped by an unprecedented wave of AI-generated content. We need reliable ways of identifying such content, to supplement the many existing social institutions that enable trust between people and organisations and ensure social resilience. In this paper, we begin by highlighting an important new development: providers of AI content generators have new obligations to support the creation of reliable detectors for the content they generate. These new obligations arise mainly from the EU's newly fnalised AI Act, but they are enhanced by the US President's recent Executive Order on AI, and by several considerations of self-interest. These new steps towards reliable detection mechanisms are by no means a panacea—but we argue they will usher in a new adversarial landscape, in which reliable methods for identifying AI-generated content are commonly available. In this landscape, many new questions arise for policymakers. Firstly, if reliable AI-content detection mechanisms are available, who should be required to use them? And how should they be used? We argue that new duties arise for media and Web search companies arise for media companies, and for Web search companies, in the deployment of AI-content detectors. Secondly, what broader regulation of the tech ecosystem will maximise the likelihood of reliable AI-content detectors? We argue for a range of new duties, relating to provenance-authentication protocols, open-source AI generators, and support for research and enforcement.`,
      },
      {
        heading: 'Introduction',
        content: `The Web, and the world beyond it, are about to be swamped by a wave of AI-generated content. AI text generation systems such as GPT-4 (OpenAI, 2023) Gemini (Google, 2024), Llama (Touvron et al., 2023), Falcon (UAE TII, 2023) and Mixtral (Jiang et al., 2024) are becoming widely used to produce textual content in a variety of domains such as news (Newsguard, 2024), business reviews (Berry, 2024), academia (Originality, 2024), and culture (Notopoulos, 2024), in an extensive range of languages (see, e.g., Fernandes, 2023). AI image generation systems such as Dall-E (OpenAI, 2021) and Midjourney (Midjourney, Inc., 2022) are producing huge volumes of AI-generated content online (see e.g. Valyaeva, 2023) and are radically changing workfows for human graphic designers (see e.g. HackerNoon, 2023). Images seem likely soon to be followed by AI video generation systems such as Sora (OpenAI, 2024). The widespread adoption of AI content-generation technologies brings many benefts (see Dell'Acqua et al., 2023; Candelon et al., 2023 for balanced reviews). However, this proliferation of AI-generated content also presents signifcant challenges. As AI generation systems improve, it will become increasingly difcult for human consumers of content to accurately tell whether an item of content was produced by a person or an AI system, or some combination of the two. This poses a brand new authentication problem: as the diferences between AI-generated and human-generated content decrease, it becomes intrinsically harder to adjudicate individual cases. Why do we need to know whether an item was generated by a person or an AI? Importantly, the reasons don’t hinge on the quality of the content. Human-generated content and AI-generated content can both vary enormously in quality. In the right contexts, both humans and AIs can produce useful, truthful, informative content; in other contexts, both humans and AIs are capable of producing harmful, misleading, inaccurate content. The reasons rather hinge on the role of AI content generation as a social practice. Communication between humans through the creation of enduring content (text, images, and other media) is fundamental to the ordering of our societies: human-generated content plays a central role in the creation and enforcement of laws, in education and training, in the dissemination of news and opinion, in the organisation of political debates and democratic processes, in the functioning of markets, in scientifc research, and in the formation and transmission of culture. In all these contexts, societies have developed resilient institutions that allow citizens to have confdence in human-generated content: from educational institutions that certify individuals as reputable content providers in specifc domains, to laws governing the broadcasting of content and the functioning of political debates, to conventions about the rule of law. AI-generated content escapes many of our existing institutions. AI content generation escapes existing institutions in two main ways.`,
      },
      {
        heading: "Guidance from Biden's Executive Order on AI",
        content: `In the US, President Biden issued an Executive Order on the Safe, Secure, and Trustworthy Development and Use of AI' in October last year. This order followed a Senate Judiciary Committee hearing on 'Oversight of AI', at which two of our co-authors (Yoshua Bengio and Stuart Russell) gave evidence (alongside Dario Amodei from Anthropic). Much of the conversation at this hearing was about AIgenerated content identifcation—and again, the methods discussed included mechanisms focussed specifcally on AIgenerated content detection tools, and broader protocols for tracking the provenance of all content, whether human- or AI-generated.`,
      },
    ],
  },
  {
    title:
      'How to deal with Big Tech power? The “ Big Tech Raj”, a new form of biopower in the digital age',
    author: 'Leclercq-Vandelannoitte',
    date: 'March 21, 2024',
    image: '/tech-rah-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',
    sections: [
      {
        content: `In this research article, we employed an autoethnographic data-walk methodology to explore the complex relationship between urban spaces and digital data collection, using the South Lake Union neighborhood as a case study. We examined how major technology companies like Amazon, Microsoft, and various property developers leverage the dual forces of urbanization and data gathering to shape urban environments in ways that serve their interests. Our key contribution lies in uncovering the power dynamics at play, where tech companies exert significant influence over urban planning and governance, reshaping cities into spaces designed for surveillance and commodification. In areas like South Lake Union, the redevelopment into numerous small storefronts enables the granular tracking of consumer behavior, turning everyday activities into data that fuels targeted advertising and capital accumulation.`,
      },
      {
        heading: 'Introduction',
        content: `Cities are undergoing significant technological transformations, with scholars continuing to debate and define the future of urban spaces—whether through smart cities, digitally connected cities, or platform urbanism. These new configurations are reshaping how data is collected, circulated, valued, and utilized. Increasingly, urban (re)development involves the integration of interconnected sensors into the built environment or in our devices, monitoring both people and the physical world. Further, platform services are extending their reach into urban spaces, from ride-share waiting areas (Attoh et al., 2019; Stehlin et al., 2020) to short-term apartment rentals that diminish available housing stock (Ferreri & Sanyal, 2018; Wachsmuth & Weisler, 2018). Recent scholarship has focused on how urban platforms are reshaping the interplay between data, infrastructure, and everyday life (Barns, 2020; Richardson, 2020a; Rodgers & Moore, 2020).At the core of these urban platforms are smartphone users and the tech firms they are connected to. Barns (2020) observes that cities are increasingly mediated by smartphone applications and the data they generate, with tech firms constructing platforms to capture and commodify this data. The concept of “platform urbanism” reflects the growing influence of digital platforms in shaping the design, experience, and governance of urban spaces (Barns, 2020, p. 19). These platforms are now central to both the production of urban environments and the global economy. Seven of the world's ten largest firms by market capitalization are technology companies engaged in the platform economy or developing technologies that drive it—Apple, Microsoft, Meta (hereafter Facebook), Alphabet (hereafter Google), Amazon, NVIDIA, and TSMC.1 Notably, five of these companies are concentrated on the US West Coast in the San Francisco Bay Area and greater Seattle (Kenney & Zysman, 2020).
How do mundane activities get traced, and how are the resulting data used? How do these data feed into the production and capture of value? How are cities reconfigured by platform capitalism to the benefit of large tech firms? Scholars often study urban platforms as intermediaries in multi-sided markets (Zuboff, 2019, p. 93) related to companies and urban spatial agglomerations (Barns, 2020; Langley & Leyshon, 2017; Richardson, 2020b; Richardson, 2020c). Most analyses focus on processes of capitalization in platforms, focusing predominantly on the valuation of data (Sadowski, 2019) or of the platform company (Kenney & Zysman, 2020; Langley & Leyshon, 2017). For McMillan Cottom, platform urbanism is an extension of already existing logics of racial capitalism, moving past the novelty of the digital to reveal the underlying processes of predatory inclusion and digital obfuscation (McMillan Cottom, 2020).Critiques of platform capitalism and its exploitative systems are well-supported. Our aim is to expand the study of the mechanisms and processes of data collection (primarily via smartphones), aggregation (in corporate-managed databases), valuation (through advertising and other channels), and usage (for creating user profiles, segmentation, and further data agglomeration) by incorporating a more human-centered, narrative-driven approach.`,
      },
      {
        heading:
          'Converging logics of data colonialism and the platform urbanism',
        content: `The places people visit for shopping, dining, recreation, or work help build a detailed profile of consumer preferences. Urban space usage becomes data for marketing segmentation, facilitated by smartphone apps, operating systems, and websites. Despite rising awareness of data commodification, the distinction between surveilled and volunteered data has become nearly irrelevant due to the power imbalance between app users and the tech firms that exploit this arrangement (Thatcher, 2017). Location data from smartphones now plays a crucial role in shaping consumer preferences. Demographic information has traditionally been used to predict future behavior, but with the rise of location-based data, there is a clear “shift away from demographics to individualized targeting” (Tufekci, 2014). This form of targeting relies on data gathered from the activity of individual users, many of which are peripheral to the platform in use and not directly tied to market transactions.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title:
      'The urban-tech feedback loop: A surveillance and development data-walk in South Lake Union',
    author: 'Dillon Mahmoudi , Anthony Levenda , Alicia Sabatino ',
    date: 'November 7 2024',
    image: '/urban-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',
    sections: [
      {
        content: `In this research article, we employed an autoethnographic data-walk methodology to explore the complex relationship between urban spaces and digital data collection, using the South Lake Union neighborhood as a case study. We examined how major technology companies like Amazon, Microsoft, and various property de velopers leverage the dual forces of urbanization and data gathering to shape urban environments in ways that serve their interests. Our key contribution lies in uncovering the power dynamics at play, where tech companies exert significant influence over urban planning and governance, reshaping cities into spaces designed for sur veillance and commodification. In areas like South Lake Union, the redevelopment into numerous small store fronts enables the granular tracking of consumer behavior, turning everyday activities into data that fuels targeted advertising and capital accumulation. We identify two central insights. First, data-walks offer a way to “story” the influence of tech corporations on urban spaces from the perspective of everyday experiences. While digital data collection is integral to capital accumulation, the process is uneven and must be viewed from various angles—including from the perspective of everyday life—to fully understand the emerging inequalities. Second, we argue that the transformation of urban environments under tech capitalism exacerbates existing social and spatial inequalities while generating new ones. The commodified surveillance of daily activities and consumption not only drives data accumulation but also reshapes the physical and social fabric of the city.`,
      },
      {
        heading: 'Introduction',
        content: `Cities are undergoing significant technological transformations, with scholars continuing to debate and define the future of urban space s—whether through smart cities, digitally connected cities, or platform urbanism. These new configurations are reshaping how data is collected, circulated, valued, and utilized. Increasingly, urban (re)development involves the integration of interconnected sensors into the built envi ronment or in our devices, monitoring both people and the physical world. Further, platform services are extending their reach into urban spaces, from ride-share waiting areas (Attoh et al., 2019; Stehlin et al., 2020) to short-term apartment rentals that diminish available housing stock (Ferreri & Sanyal, 2018; Wachsmuth & Weisler, 2018). Recent scholarship has focused on how urban platforms are reshaping the interplay between data, infrastructure, and everyday life (Barns, 2020; Richardson, 2020a; Rodgers & Moore, 2020). At the core of these urban platforms are smartphone users and the tech firms they are connected to. Barns (2020) observes that cities are increasingly mediated by smartphone applications and the data they generate, with tech firms constructing platforms to capture and commodify this data. The concept of “platform urbanism” reflects the growing influence of digital platforms in shaping the design, experience, and governance of urban spaces (Barns, 2020, p. 19). These platforms are now central to both the production of urban environments and the global economy. Seven of the world's ten largest firms by market capi talization are technology companies engaged in the platform economy or developing technologies that drive it—Apple, Microsoft, Meta (hereafter Facebook), Alphabet (hereafter Google), Amazon, NVIDIA, and TSMC.1 Notably, five of these companies are concentrated on the US West Coast in the San Francisco Bay Area and greater Seattle (Kenney & Zysman, 2020).
Critiques of platform capitalism and its exploitative systems are wellsupported. Our aim is to expand the study of the mechanisms and pro cesses of data collection (primarily via smartphones), aggregation (in corporate-managed databases), valuation (through advertising and other channels), and usage (for creating user profiles, segmentation, and further data agglomeration) by incorporating a more human-centered, narrative-driven approach. We take a critical look at how everyday ac tions and spaces, often overlooked, play a crucial role in the operation of tech firms and their reshaping of urban environments (Barns, 2020; Leszczynski, 2020). Using a data-walk (see Powell, 2018a, 2018b)—an autoethnographic approach centered on technology—we illuminate the power dynamics between tech companies and the built environment, and how the surveillance of daily activities ultimately re/produces social and spatial inequalities.`,
      },
      {
        heading: 'The data-walk: Storying digital platforms',
        content: `My Link light rail train stopped at King Street Station in Seattle. I took my headphones off as I got off the light rail. I was excited that I'd get to get a little bit of a walk in after traveling to Seattle and had marked The Seattle Pinball Museum as “Places To Go” in Google Maps. I am familiar with Seattle, but I couldn't exactly remember how to get to the museum, so I used my phone to find directions from “My Location” ul timately deciding on taking the King Street route—despite it being 1 min longer—so I could sneak buy Hing Hay Park. I was relieved to see the confirmation from Google Maps that it was open, despite going to their website to find out the museum's hours. After spending an hour or so in awe of pinball machines I decided to take a picture of one of the pinball machines and post it to Instagram. I left and rode the Rapid Ride E-Line bus—my ticket on the Transit GO Ticket app was still valid—toward South Lake Union.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title:
      'Equity Structure and Corporate Innovation Performance: Evidence from Chinese High-Tech Companies',
    author: 'Hesheng Chen, Sijia Qiao, Kegong Zhang ',
    date: 'October 12, 2024',
    image: '/equity-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',
    sections: [
      {
        content: ` In the era of globalization and technological innovation, enhancing business innovation performance is pivotal for driving economic growth and maintaining competitive edge. Among the various aspects of corporate governance, equity structure stands out for its influence on firms' innovative activities. This study explores the impact of equity structure on the innovation performance of high-tech listed companies, as well as the mediating role of R&D investment and the moderating effect of market competition. A review of the literature identifies gaps in current research, such as the lack of attention to the multifaceted influence of equity structure and the limited focus on how external environmental factors affect innovation performance. The research employs a bidirectional fixed-effects regression model, analyzing unbalanced panel data from high-tech listed companies between 2012 and 2021. Findings suggest an inverted U-shaped relationship between equity ownership concentration and innovation performance, indicating that both low and excessive concentration can be detrimental. Additionally, equity checks and balances positively influence innovation performance. R&D investment acts as a mediator between equity structure and innovation performance, while market competition moderates the relationship between ownership concentration and innovation performance. However, the moderating role of equity checks and balances on innovation performance is not significant.`,
      },
      {
        heading: 'Introduction',
        content: `With the integration of the global economy and the rapid advancements in science and technology, high-quality innovation has become a critical driver for the sustainable growth of enterprises (Pu, X., et al., 2023). In this evolving landscape, both academia and practitioners are increasingly focused on how companies can enhance their technological innovation and improve innovation performance through effective internal governance structures, particularly through the optimization of equity structures. Equity structure, being central to corporate governance, has emerged as a significant factor influencing firms' R&D investment and innovation performance, making it a key topic in corporate governance and strategic management research. The existing literature indicates that equity structure, a cornerstone of corporate governance, significantly impacts firms' innovation activities. However, the academic community has yet to reach a consensus on the specific relationship between equity structure and business innovation performance (Shleifer,A., & Vishny, R.W., 1997; Morck, R., 1988). Particularly, the relationship between equity ownership concentration and innovation performance remains ambiguous (Hosono, K., et al., 2004; Yafeh, Y., & Yosha, O., 2003; Zhang Y.J., et al., 2018). Additionally, the complex interplay between equity checks and balances and R&D investment has not been thoroughly examined (Porta R L & Shleifer A., 1999; Liu S. Q., & Liu X., 2010). Furthermore, the role of market competition as an external moderator of the relationship between equity structure and innovation performance has received limited attention (Jia K.W., et al., 2018).
Motivated by these research gaps, this study aims to provide empirical insights into the relationship between equity structure, R&D investment, and innovation performance among listed high-tech firms in China. By exploring the underlying mechanisms and external moderating factors, this research seeks to offer new theoretical support for understanding the innovation dynamics of high-tech firms. It also aims to provide valuable references for policy-making and corporate management practices. Most existing academic studies either examine how equity structure enhances business innovation performance or consider R&D investment as an explanatory variable to assess its impact on innovation performance. However, there is a scarcity of research that delves into the intrinsic mechanisms linking equity structure, R&D investment, and innovation performance. Even fewer studies analyze the intricate relationship introduced by the mediating role of R&D investment and its impact on innovation performance through the dimensions of equity structure. This paper posits that R&D investment is both a consequence of optimized equity structure and a condition that spurs innovation performance. Therefore, this study emphasizes the need to deeply explore the intrinsic mechanisms between these three variables. It specifically investigates the mediating effect of R&D investment and finds that the results not only broaden the theoretical scope but also deepen our understanding of the underlying mechanisms. Moreover, current literature lacks thorough analyses of how external factors, such as market competition, moderate the effect of equity structure on business innovation performance.`,
      },
      {
        heading:
          'Equity Ownership Concentration and business Innovation Performance',
        content: `Equity ownership concentration is a critical aspect of corporate governance and has a complex impact on business innovation performance. According to principalagent theory, appropriate levels of ownership concentration help align the interests of Journal Pre-proof majority and minority shareholders, fostering innovative behavior within the firm. When equity is concentrated to a reasonable extent, controlling shareholders tend to focus on the long-term development of the firm and are more likely to invest in innovation, potentially enhancing the business innovation performance. However, if ownership concentration becomes too high, controlling shareholders might pursue selfinterested actions due to a lack of effective oversight, which can weaken the business innovation performance. After reviewing the data on the relationship between ownership concentration and business innovation performance, scholars generally agree that ownership concentration can have both positive and negative linear effects on innovation performance.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title:
      'Tech revolution unleashed: Navigating the winds of digital transformation in the fast lane',
    author:
      'Muhammad Saleem Sumbala, Adeel Tariqb , Quratulain Amberc , Kamila Janovsk , Alberto Ferrarise ',
    date: 'July 2024',
    image: '/revolution-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',

    sections: [
      {
        content: `Building on the dynamic capability perspective, this study investigates effective digitalization and digital transformation strategies in the tech industry by highlighting the relevance of the digital divide among developed and developing economies. Further, the study identifies the key challenges, opportunities, and strategies for digitalization and digital transformation. The study embraced a qualitative approach for indepth exploration of the phenomenon through a comparative study of two countries, i.e., Hong Kong and Pakistan. Data was collected using interviews and analyzed using content analysis to identify recurring patterns and critical insights for meaningful interpretations to address the study objective. We proposed a framework for effective digitalization and digital transformation in the tech industry from the perspective of developed and developing economies. The strategies identified in this research are categorized in technopreneurship and improved human resource practices to address the challenges faced by both developed and developing countries. The study findings contribute to a deeper understanding of the digital transformation phenomenon in the wake of changing workforce dynamics and technological disruptions, as well as the digital divide between developed and developing countries. Further, the study will help policymakers devise and implement resilient strategies in the tech industry, to help reduce the digital divide.`,
      },
      {
        heading: 'Introduction',
        content: `With the increasing research interest on digital technologies, there is a rise on the literature focused on digitization, digitalization, and digital transformation. However, there are some conceptual overlaps among the three constructs (Gradillas & Thomas, 2023). These three terms are often used together and sometimes interchangeably, which could lead to the confusion if we just directly discuss them without further clarification in this study. Therefore, it is essential to define digitization, digitalization and digital transformation. Digitization is referred to the technical process of transforming the analogue information into the digital form, which results in the efficiencies in terms of time, cost and space (Begkos et al., 2023). Digitization necessitates the development of digital infrastructures and applications, making it a crucial first step towards digitalization, as it drives the marginal cost of producing information goods to near zero and reduces digital storage costs, allowing organizations to dramatically increase the amount of visible and available data (Borcan, 2021). Digitalization is defined as the ability of an enterprise to convert existing products and services into digital versions that offer greater advantages than their physical counterparts (Zhang & Chen, 2024). Through digitalization, enterprises’ business can gain a competitive edge by introducing innovative services via digital channels or adopting new operation management systems that facilitate the smooth coordination among processes (Costa Melo et al., 2023). While digitalization involves the improvement of business processes through the use of technology, digital transformation entails the development of new business models by leveraging and combining emerging digital technologies such as artificial intelligence, cloud computing, blockchain, and big data (Malodia et al., 2023), and it is the organization-wide shift of business models to digital platforms by implementing digitalized business logic (Verhoef et al., 2021). In other words, digital transformation is regarded as a kind of digital strategy that reshapes an organization or a network of organizations across multiple dimensions, such as governance, leadership, culture, workforce and so on (Raza et al., 2023). Regarding the impact and contribution, digitalization and digital transformation have transformed businesses and societies worldwide (Fernandez-Vidal et al., 2022; Popkova et al., 2022). In today’s digital economy, digitalization and digital transformation are crucial for success in the digital landscape (Zhong & Ren, 2023) as they integrate technology and digital resources with enterprise business operations (Zoppelletto et al., 2023). Digitalization enhances business operations, such as supply chain management, product innovation, and workforce management.`,
      },
      {
        heading: 'Strategies and challenges for digital transformation',
        content: `Digital transformation shapes the ecosystem through new business models (Santos et al., 2023). In this direction, the literature discusses several strategies for effective digital transformation in organizations (Bargoni et al., 2024; Kraus et al., 2021). Linking digital transformation with digital entrepreneurship, Paul et al. (2023) have devised a strategy to convert traditional organizations into digital by effectively transitioning towards a digital ecosystem. They develop a conceptual framework for the digitalization process through a structured literature synthesis. The strategies they suggested are the creation of a digital knowledge base, adoption of digital technology, readiness of digital platform, business process transformation, business resources transformation, and business model transformation. Through a literature review, Trenerry et al. (2021) have identified supporting factors for digital transformation at the individual, group, and organizational levels. Individual-level strategies are technology acceptance and adoption, perceptions and attitudes, skills and training, workplace resilience and adaptability, and work-related stress and well-being.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title: 'The rise (and fall) of tech clusters',
    author:
      'Sergei Kichkoa , Wen-Jung Liangb , Chao-Cheng Maic , Jacques-Francois Thissed , Ping Wang',
    date: 'July 21, 2024',
    image: '/rise-fall-blog.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',

    sections: [
      {
        content: `Tech clusters play a growing role in knowledge-based economies by accommodating high-tech firms and providing an environment that fosters location-dependent knowledge spillovers and promote R&D investments by firms. Yet, not much is known about the economic conditions under which such entities may form in equilibrium without government interventions. This paper develops a spatial equilibrium model with a competitive final sector and a monopolistically competitive intermediate sector, which allows us to determine necessary and sufficient conditions for a tech cluster to emerge as an equilibrium outcome. We show that strongly localized knowledge spillovers, skilled labor abundance, and low commuting costs are key drivers for a tech cluster to form. With continual improvements in infrastructure and communication technology that lowers distance decay in knowledge spillover or coordination costs, tech clusters will eventually be fragmented.`,
      },
      {
        heading: 'Introduction',
        content: `The concept of tech clusters has gained the favor of many analysts and policy-makers (see Kerr and Robert-Nicoud, 2020, for a detailed review and an exhaustive list of references). Even though the idea of industrial district has been around for a long time (Marshall, 1890, ch. X), it was not until the 1990 s that the related concept of tech cluster, or science park, has been developed (Castells and Hall, 1994; Saxenian, 1994; Porter, 2000). Although there is a rich variety of tech clusters (Klepper, 2010; McCarthy et al., 2018), they do share some common features, which help us distinguishing them from other types of clusters. We then define a tech cluster as a settlement that (i) accommodates knowledge-intensive firms and (ii) encourages firms to undertake R&D investments because they benefit from knowledge spillovers across the cluster (Kerr and Robert-Nicoud, 2020). Hence, a firm’s productivity depends on how much it invests in R&D, but also on the total amount of knowledge available in the cluster, whose value is determined by all firms’ R&D expenditure weighted by the distances that separate them. What characterizes skilled workers here is their ability to undertake different tasks in the intermediate and final sectors. In particular, when new and specialized intermediate inputs contain a large amount of knowledge, combining them to produce the final good requires specific coordination and learning activities (Becker and Murphy, 1992). This amounts to assuming that the final sector needs a number of skilled labor units when it uses newly designed intermediate inputs. What is more, a city hosting a tech cluster provides office and lab space, as well as housing, retail, restaurants and other leisure facilities within a compact geographic area (Katz and Bradley, 2013; McCarthy et al., 2018). To be precise, we consider a high-tech cluster as a special type of city whose spatial structure is determined endogenously by the interaction between multiple stakeholders through the above-mentioned channels. Despite the importance of tech clusters in the real world, it is fair to say that this concept has attracted little attention in economic theory.`,
      },
      {
        content: `This is where we hope to contribute by providing a full-fledged general equilibrium model that allows us to determine under which conditions a high-tech city emerges as a decentralized equilibrium outcome. The main tenet of this paper is that the emergence and efficiency of a tech cluster is intimately related to the spatial structure of the area that hosts it. To show this, we view a tech cluster as a city formed by firms involved in R&D activities and which interact to determine endogenously knowledge spillovers. We echo Kerr and Robert-Nicoud (2020) by focusing on knowledge spillovers and R&D activities. In line with the empirical literature, we recognize that knowledge spillovers both depend on localization via a distance-decay function and raise the marginal product of R&D and production technologies.1 These specific features of a high-tech city differentiate our model from typical city formation models where cities are marketplaces, transportation nodes, or factory towns. Endogenous knowledge spillovers give rise to varying strength of spatial externality which depend on the endogenous choice of firms’ location within city. By its nature, a spatial externality takes the highest value under high-tech city structure. This motivates us to focus on this particular city structure in the benchmark framework. `,
      },
      {
        content: `Additionally, our model contrasts with the conventional ones by allowing the size of the high-tech city to be endogenous. This is an important feature enabling us to explain why tech clusters first grow and, then, decline. Despite several simplifications, it is our belief that our setting will contribute to a better understanding of the formation of high-tech cities and will allow for a more precise quantification of their economic consequences and a better evaluation of relevant policies. To achieve our goal, we develop a model that captures the following basic features: (i) a composite consumption good is produced by using an endogenous range of specialized inputs provided by intermediate firms whose combination generates coordination problems that require the hiring of production-line designers; (ii) high-skilled workers are hired to produce intermediate goods or to conduct R&D in the intermediate sector; (iii) the productivity of an intermediate firm depends on its level of R&D investments and inter-firm spillovers, the intensity of which depends on how intermediate firms are distributed across space; and, (iv) both workers and intermediate firms are spatially mobile and use land. The novelty of our approach lies in an agglomeration force that combines firms’ R&D investments and the existence of localized knowledge spillovers. On the other hand, the dispersion force, which is generated by both intermediate firms’ and workers’ demand for land and costly commuting, is common to most models of city formation. As usual, the equilibrium distribution of firms and workers is determined as the balance between these two opposite forces. Our main results may be summarized as follows. We begin by establishing necessary and sufficient conditions for a high-tech cluster to emerge as a spatial equilibrium outcome.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title:
      'How tech companies advance sustainability through artificial intelligence',
    author:
      'Felix Zechiel  , Marah Blaurock  , Ellen Weber , Marion Büttgen , Kristof Coussement',
    date: 'April 21, 2024',
    image: '/ai-blog2.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',

    sections: [
      {
        content: `Sustainability is at the top of the agenda of most tech companies. Specifically, tech companies increasingly utilize artificial intelligence (AI) to meet their sustainability goals. However, little is known about how tech companies can leverage AI to accelerate sustainability by formulating and implementing appropriate strategies. To better understand the intertwined nature of AI and sustainability from a strategy perspective, this research conceptually develops a novel AI x Sustainability framework by drawing from the nested sustainability model and integrating insights from different literature streams. It then applies this framework to six leading Big Tech companies (i.e., Amazon, Google, IBM, Meta, Microsoft, and SAP) by conducting a comprehensive document analysis of 69 documents describing 244 individual AI x Sustainability initiatives to reveal whether and how these companies appear to follow specific AI x Sustainability strategies. Lastly, an exploratory survey with potential tech com panies’ clients (N = 192) sheds light on how clients perceive tech companies’ communicated strategic posi tioning based on the framework. The research provides new theoretical insights, serves as a blueprint for other tech companies, including implications for their AI x Sustainability positioning, and offers a variety of future research directions.`,
      },
      {
        heading: 'Introduction',
        content: `Urgent environmental problems and stakeholder pressures demand companies to promote sustainability for their long-term viability (Yasin, Huseynova, & Atif, 2023). Thus, companies are increasingly challenged to focus on ecological sustainability not only by the threat of climate ca tastrophes but also by customers’ and investors’ preferences to establish strong relationships specifically with companies demonstrating a posi tive sustainability performance (Gupta & Gupta, 2020; Rosenbaum, Russell-Bennett, & Contreras-Ramírez, 2022). Besides the ecological dimension of sustainability (e.g., Heikkurinen, Young, & Morgan, 2019), there has also been an increasing concern about social sustainability—at least partially caused by stakeholder pressure (Kapitan, Kemper, Vre denburg, & Spry, 2022)—which refers to a company’s care for societal aspirations (e.g., social equity and diversity) as well as its employees (e. g., employee health and decent work conditions) (Castaldi, Wilhelm, Beugelsdijk, & van der Vaart, 2023). However, companies increasingly perceive sustainability not only as a burden to survive but also as necessary and inevitable and many companies now prioritize both ecological and social sustainability by considering them a major concern (Kapitan et al., 2022; Mishra & Yadav, 2021). To meet their sustainability goals, companies have recently started to realize the benefits of utilizing artificial intelligence (AI), generally defined as technologies that enable a machine to imitate human capa bilities and behaviors (Rahman, Bag, Gupta, & Sivarajah, 2023; Song, Xu, & Zhao, 2022). However, the use of AI alone cannot be expected to be sustainable or lead to sustainability per se. Consequently, AI needs to be specifically designed and implemented to reach this objective; embedded in the company’s corporate strategy. Such a strategy typically concerns what business(es) a company promotes (i.e., strategy formu lation) and how its resources should be allocated across those businesses (i.e., strategy implementation) (Walker & Ruekert, 1987). Both com ponents are relevant as strategy formulation can only be effective when implemented correctly (Aladag, Koseoglu, ¨ King, & Mehraliyev, 2020).
Against this background, practitioners and researchers stress the need to understand how companies can leverage AI to accelerate sustainability by formulating (i.e., focusing on the what) and implementing (i.e., focusing on the how) appropriate strategies. A plethora of research exists regarding the separate domains of AI and sustainability (e.g., Baum gartner & Ebner, 2010; Borges, Laurindo, Spínola, Gonçalves, & Mattos, 2021; Borland, Ambrosini, Lindgreen, & Vanhamme, 2016; Huang & Rust, 2021; Lloret, 2016). While existing studies have produced addi tional valuable insights into the interplay of AI and sustainability, they primarily focus on specific industry applications and are predominantly descriptive in nature. For example, research investigates how AI appli cations optimize the sizing of photovoltaic systems (Mellit, Kalogirou, Hontoria, & Shaari, 2009) or reveals how AI can be successfully lever aged for sustainable advancements in healthcare (Ducret, Morch, ¨ Kar teva, Fisher, & Schwendicke, 2022). However, the simultaneous consideration of both AI and sustainability (i.e., AI x Sustainability) through developing a specific strategy has gained little attention so far. Hence, from a theoretical perspective, literature lacks a strategy-based concept mirroring the intertwined nature of AI and sustainability.`,
      },
      {
        heading:
          'Identifying Big Tech companies’ positioning within the AI x Sustainability strategy framework',
        content: `We conducted a document analysis to answer our second research question on how leading Big Tech companies’ communicated AI x Sus tainability initiatives can be classified in terms of strategy formulation and implementation. Document analysis is a qualitative research method that gathers and analyzes data from existing written documents (Bowen, 2009). Our data comprises company sustainability reports, blogs, and website data from six Big Tech companies. A qualitative approach to analyzing documents is frequently applied in industrial marketing studies (e.g., Kokshagina & Keranen, ¨ 2022; Tabaklar, Sorkun, Yurt, & Yu, 2021) and is especially suitable in the case of our research for various reasons.`,
      },
      // Additional sections as needed
    ],
  },
  {
    title: 'Moving beyond the predictable failure of Ed-Tech initiatives',
    author:
      'Juan M. Sanchez-Criado, Pablo Rivera-Vargas & Raquel Miño-Puigserver',
    date: 'September 19, 2024',
    image: '/blog-1.png', // Adjust the path to your asset location
    description:
      'This article builds on more than 20 years of research in the field of educational technology...',
    sections: [
      {
        content: `This article builds on more than 30 years of research in the field of educational technology. It stretches back to the early 1980s where one of us participated in the first governmental initiative to introduce computers in education in Spain (Bertrán and Sancho 1985; Sancho Gil 1995). This work was followed throughout the years by a suite of studies and investigations carried out by our research group ESBRINA (http://esbrina.eu). In particular, the implementation of a series of local, national, European and international projects (Bosco, Sánchez-Valero, and Sancho-Gil 2016; Domingo, Sánchez, and Sancho 2014; Hernández-Hernández and Sancho-Gil 2017; MiñoPuigcercós, Domingo-Coscollola, and Sancho-Gil 2019; Miño and Sancho 2015; Sancho Gil and Padilla Petry 2016; Sancho-Gil and Rivera-Vargas 2016) alongside the organisation of international conferences, gives us a basis from which to now reflect on the complexities and limitations of digital technology-based reforms in education.`,
      },
      {
        heading: 'Introduction',
        content: `We begin by questioning the dominant reductionist view of ‘technology’ underling the majority of Ed-Tech initiatives for improving education in different parts of the world. Most efforts to introduce digital technology into educational institutions tend to conflate the terms ‘digital technology’ and ‘technology’. This needs to be seen as problematic. On one hand, digital technology constitutes state-of-the-art devices and artefacts designed by men from the ‘developed world’ to satisfy their desire for wealth, power, domination and entertainment. ‘Digital technology’ immediately places women, children, young people and other disadvantaged groups in a position of subordination and inequality, and sits in stark contrast to the broader notion of technology as applied knowledge – i.e., as knowledge in action. Used in its proper sense, technology is a form of doing or interacting with the world that does not necessary involve the use or production of costly digital artefacts. This ahistorical and decontextualised approach of the past 30 years of inserting (digital) ‘technology’ into schools systematically disregards thousands of years’ history of humanity, civilisation and the continuous development of systematic techniques for making and doing things. As should be 2 J. M. SANCHO-GIL ET AL. well known, the term technology is the combination of the Greek technē, (‘art, craft’) with logos (‘word, speech, reflection, transmission’) from the classical discourse on the fine and applied arts (e.g., the art of sailing, the art of governing, the art of educating). This combination highlights the need for any ‘art’ to be supported by ‘tools’ (artefactual technology) as well as organisational methods (organisational technology), signs, symbols, rituals, representations (symbolic technology). It also highlights the imperative to maintain and improve the lives of all the inhabitants of the planet in order to maintain our survival (i.e., biotechnology) (Álvarez, Martínez, and Méndez 1993). However, the forms of Western science that rose to prominence through the First and Second World Wars promoted the idea of ‘technology’ as applied scientific knowledge, deeply linked to the production of artefacts and to the idea of innovation, consumerism and progress.
      This Western notion has taken hold in many parts of the world, with its culmination in the present seemingly ‘irresistible’ development of ‘digital technology’. Thus, most commentators in the field of educational technology systematically speak about ‘technology’ when referring to ‘digital technology’ (‘I do not use technology’, ‘schools should use technology’, and so on). This, we contend, is not an insignificant slip of the tongue. Instead, this framing leads to the disregarding of social, economic and political collateral damages and conflicts brought about any new technological development (c.f. Mumford 1938). In addition, as argued by Heidegger is the loss of the association between technology and humanity, and a sense of the significance of technology for most human beings.`,
      },
      {
        heading:
          'A predictable failure of Ed-Tech intervention in the digital society',
        content: `The trend throughout the 1990s and 2000s was for ambitious national Ed-Tech initiatives and programmes. These were almost always positioned within the concept of ‘Information and Knowledge Society’ (IKS) and the foregrounding of digital technology as a major driver of change in post-industrial society (Beck, Giddens, and Lash 1994; Castells 1996; UNESCO 2005; UNESCO 2011; Selwyn 2019). It is interesting to consider how this has shaped (and arguably restricted) what educational technology has come to be understood to be. Indeed, from an exhaustive analysis of the existing definitions of IKS from the academic, political and economic worlds, Cummings et al. (2018) identify two major discourses that can be argued in combination to typify dominant framings of Ed-Tech around the world. First, is a prevailing techno-scientific-economic discourse largely endorsed by governments of developed countries. `,
      },
      // Additional sections as needed
    ],
  },
];
