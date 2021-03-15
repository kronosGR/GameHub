/**
 * description Search games by keyword
 * @param {string} keyword - the keyword
 * @return {array} list of games
 */
function searchGamesWithKeyword(keyword) {
  const result = [];
  for (let game of games) {
    if (
      game.title.includes(keyword) ||
      game.genre.includes(keyword) ||
      game.about.includes(keyword)
    ) {
      result.push(game);
    }
  }
  return result;
}

// list of all the games
const games = [
  {
    id: 0,
    title: "DEATH STRANDING",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: `<p>
      <b>Will you make the right decisions?</b>
      Take on the peloton in over 230 races and 650 stages, from the Tour de France to La Vuelta to the classic events of the World Tour calendar.
      Become the manager of a cycling team and take them to the top! To get there, you will need to manage finances and recruitment, plan your training and implement your strategy. And for the first time in the Pro Cycling Manager series, you must look after your riders and their morale! One decision can change everything...
      </p>
      <br>
      <p>
      You must listen to the requests of your cyclists (inclusion in races, personal goals, etc.) and either agree to them or decline. You are the manager, only you can make the decisions that will maintain balance in your team and motivate your cyclists in crucial moments while trying to achieve the best results for your team.
      You can also play as your own cyclist and pursue a career to the highest summits in the Pro Cyclist mode. Proved yourself in Career mode? Play online mode with up to 15 other players from all over the world.
      </p>
      <br>
      <p>
      <b>NEW IN THE 2020 EDITION</b><br>
      The 21 official stages of the Tour de France 2020
      </p>
      <br>
      <p>
      <b>Career mode:</b>
      <br>Manage the morale of your cyclists: they will make requests (inclusion in races, recruitment of cyclists, etc.), and your decision will affect their morale and performance. The transfer window is also crucial for maintaining balance within your team
      <br> Motivation during races: in each race, the motivation of your cyclists is linked to morale and key events, such as wearing a jersey, winning in the previous stage, etc. A fully motivated cyclist can excel in pivotal moments in the race, including an accelerating peloton and preparation for the final sprint
      <br>A new assistant to help you plan your races
      <br>A redesigned dashboard
      <br>Improved AI, more aggressive and adventurous                            
      </p>`,
    price: 20,
    image: "images/games/deathStrandingFull.jpg",
    thumb: "images/games/deathStranding.png",
    requirements: `System Requirements
      Requires a 64-bit processor and operating system
      OS: 64-bit Windows 7, Windows 8, Windows 10
      Processor: Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz
      Memory: 4 GB RAM
      Graphics: Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)
      Network: Broadband Internet connection
      Storage: 20 GB available space
      Additional Notes: INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME`,
    pegi: 18,
  },
  {
    id: 1,
    title: "Farming Simulation 2019",
    genre: ["simulation"],
    about: ` <p>
          The best-selling franchise returns this year with a complete overhaul of the graphics engine, offering the most striking and immersive visuals and effects, along with the deepest and most complete farming experience ever.
      </p>
      <br>
      <p>
          Farming Simulator 19 takes the biggest step forward yet with the franchise’s most extensive vehicle roster ever! You’ll take control of vehicles and machines faithfully recreated from all the leading brands in the industry, including for the first time John Deere, the largest agriculture machinery company in the world, Case IH, New Holland, Challenger, Fendt, Massey Ferguson, Valtra, Krone, Deutz-Fahr and many more.
      </p>
      <br>
      <p>
          Farming Simulator 19 will feature new American and European environments in which to develop and expand your farm and will introduce many exciting new farming activities, including new machinery and crops with cotton and oat! Tend to your livestock of pigs, cows, sheep, and chickens - or ride your horses for the first time, letting you explore in a brand-new way the vast land around your farm.
      </p>
      <br>
      <p>
          Farming Simulator 19 is the richest and most complete farming experience ever made!
      </p>
      <br>
      <p>
          <b>MAIN FEATURES</b>
          The biggest step forward for the Farming Simulator franchise, offering the most striking and immersive graphics ever
          Use and drive hundreds of faithfully reproduced farming vehicles and tools, including for the first time John Deere
          Tend to your livestock including pigs, cows, sheep, chicken, and for the first time horses
          Ride your own horses and explore the vast areas offered in huge open worlds loaded with farming activities
          Develop your farm online with up to 16 players and enrich your Farming experience with community-created mods                            
      </p>`,
    price: 11,
    image: "images/games/farmingSimulatorFull.jpg",
    thumb: "images/games/farmingSimulator.png",
    requirements: `<p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
  },
  {
    id: 2,
    title: "Football Manager 2020",
    genre: ["Simulation", "Sports"],
    about: ` <p>
          Run your football club, your way. Every decision counts in Football Manager 2020 with new features and polished game mechanics rewarding planning and progression like never before, empowering managers to develop and refine both your club’s and your own unique identity.
      </p>
      <br>
      <p>
          Walk down the tunnel to a living, breathing football world with you at the very heart of it. Around here, your opinion matters!
      </p>
      <br>
      <p>   
          This is a world that rewards planning and knowledge but, unlike other games, there’s no pre-defined ending or script to follow – just endless possibilities and opportunities. Every club has a story to tell and it’s down to you to create it.
      </p>
      <br>
      <p>
          They say football is a game of dreams. Well, managers are a special breed of dreamers.
      </p>
      <br>
      <p>
          They don’t see problems, only opportunities: the chance to prove themselves against the best in the world, to develop and instil a new footballing philosophy, to nurture talent through the ranks, to lift the club to greater heights and end the wait for silverware.
      </p>
      <br>
      <p>
          How you get to the top is up to you… you’ll own your decisions, and the consequences they bring…
      </p>
      <br>
      <p>
          Base yourself in 50 of the biggest footballing countries worldwide
          Oversee a new era of success at one of 2,500 clubs at every level
          Sign the best and mould the future – scout more than 500,000 real players and staff
          Create your tactical vision and bring it to life on the training pitch
          Kick every ball with our most immersive and smartest match engine to date
      </p> `,
    price: 20,
    image: "images/games/footballManagerFull.jpg",
    thumb: "images/games/footballManager.png",
    requirements: `<p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
  },
  {
    id: 3,
    title: "Hunting Simulator 2",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: ` <p>
          It's open season!
      </p>
      <br>
      <p>
          In stunning natural environments, choose your gear from the best official weapons and accessories and set off with your dog in search of a variety of animal species in this hunting simulation.
      </p>
      <br>
      <p>
          Hunting in an open world
      </p>
      <br>
      <p>
          Explore the plains of Colorado, the Texan desert and the forests of Eastern Europe in vast open worlds of over 6 square miles.
      </p>
      <br>
      <p>
          A wide variety of animals
      </p>
      <br>
      <p>
          Track down 33 animal species in their natural environment by using the best hunting techniques. Locate animal tracks and follow them to reveal your prey.
      </p>
      <br>
      <p>
          Realism at the heart of the game experience
      </p>
      <br>
      <p>
          Hunt animals with realistic behaviours and advanced artificial intelligence. Aim accurately to ensure you don't ruin your trophy.
      </p>
      <br>
      <p>
          A faithful companion
      </p>
      <br>
      <p>
          Use your hunting dog to track your prey. Labrador Retriever, German Shorthaired Pointer and Beagle, each dog has its specific hunting attributes.
      </p>
      <br>
      <p>
          Lots of equipment to choose from
      </p>
      <br>
      <p>
          Kit yourself out with over 160 weapons, accessories and clothing items from the best brands: Browning, Winchester, Bushnell, Kryptek, Verney-Carron...
      </p> `,
    price: 19,
    image: "images/games/huntingSimulator2Full.jpg",
    thumb: "images/games/huntingSimulator2.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 18,
  },
  {
    id: 4,
    title: "Microsoft flight simulator",
    genre: ["Simulation"],
    about: ` <p>
          From light planes to wide-body jets, fly highly detailed and accurate aircraft in the next generation of Microsoft Flight Simulator. Test your piloting skills against the challenges of night flying, real-time atmospheric simulation and live weather in a dynamic and living world. Create your flight plan to anywhere on the planet. Microsoft Flight Simulator includes 20 highly detailed planes with unique flight models and 30 hand-crafted airports.
      </p>
      <br>
      <p>
          <b>The World is at your Fingertips.</b>
      </p>
      <br>
      <p>
          • Vivid and Detailed Landscapes – Immerse yourself in the vast and beautiful world that is our planet with over 37 thousand airports, 1.5 billion buildings, 2 trillion trees, mountains, roads, rivers and more.
      </p>
      <br>
      <p>
          • Living World – Earth is vibrant and ever-changing and so is the world of Microsoft Flight Simulator which includes live traffic, real-time weather and animals.
      </p>
      <br>
      <p>
          <b>Earn Your Wings.</b>
      </p>
      <br>
      <p>
          • Aircraft – Hone your pilot skills in a variety of aircraft from light planes to commercial jets with comprehensive flight models. Every aircraft includes highly detailed and accurate cockpits with realistic instrumentation.
      </p>
      <br>
      <p>
              • New Checklist System - From pro to beginner, scale your level from full manual to full assist with interactive and highlighted instrument guidance and checklist.                      
      </p>`,
    price: 25,
    image: "images/games/flightSimulatorFull.jpg",
    thumb: "images/games/flightSimulator.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
  },
  {
    id: 5,
    title: "Pro cycling manager 2020",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: ` <p>
            Will you make the right decisions?
        </p>
        <br>
        <p>
            Take on the peloton in over 230 races and 650 stages, from the Tour de France to La Vuelta to the classic events of the World Tour calendar.
        </p>
        <br>
        <p>
            Become the manager of a cycling team and take them to the top! To get there, you will need to manage finances and recruitment, plan your training and implement your strategy. And for the first time in the Pro Cycling Manager series, you must look after your riders and their morale! One decision can change everything...
        </p>
        <br>
        <p>
            You must listen to the requests of your cyclists (inclusion in races, personal goals, etc.) and either agree to them or decline. You are the manager, only you can make the decisions that will maintain balance in your team and motivate your cyclists in crucial moments while trying to achieve the best results for your team.
        </p>
        <br>
        <p>
            You can also play as your own cyclist and pursue a career to the highest summits in the Pro Cyclist mode. Proved yourself in Career mode? Play online mode with up to 15 other players from all over the world.
        </p>
        <br>
        <p>   
            <b>NEW IN THE 2020 EDITION</b>
        </p>
        <br>
        <p>The 21 official stages of the Tour de France 2020
        </p>
        <br>
        <p>
            <b>Career mode:</b>
        </p>
        <br>
        <p>Manage the morale of your cyclists: they will make requests (inclusion in races, recruitment of cyclists, etc.), and your decision will affect their morale and performance. The transfer window is also crucial for maintaining balance within your team
        </p>
        <br>
        <p>Motivation during races: in each race, the motivation of your cyclists is linked to morale and key events, such as wearing a jersey, winning in the previous stage, etc. A fully motivated cyclist can excel in pivotal moments in the race, including an accelerating peloton and preparation for the final sprint
        </p>
        <br>
        <p>A new assistant to help you plan your races
        </p>
        <br>
        <p>A redesigned dashboard
        </p>
        <br>
        <p>Improved AI, more aggressive and adventurous
        </p> `,
    price: 19,
    image: "images/games/proCyclingManagerFull.jpg",
    thumb: "images/games/proCyclingManager.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
            <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
  },
];
