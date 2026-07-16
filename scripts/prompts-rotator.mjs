/**
 * prompts-rotator.mjs
 * ----------------------------------------------------------------------------
 * Spartina Technology - Auto Image Prompt Rotator
 *
 * Spartina Technology is an AI-native studio for multimodal digital product
 * generation. This module produces 30 diverse, production-ready text-to-image
 * prompts per batch, rotating through four content categories based on the
 * hour of day (UTC). Prompts are tuned for gpt-image-1 / DALL-E 3.
 *
 * Category rotation (UTC hour):
 *   00-05  visual-assets  - abstract wallpapers, digital art, generative patterns
 *   06-11  game-assets    - character concepts, environment art, prop designs
 *   12-17  industrial     - product mockups, architectural visualization, industrial design
 *   18-23  education      - educational illustrations, scientific visualization, infographic art
 *
 * Public API:
 *   - generatePrompts(date = new Date()) -> Array<{prompt, filename, category, title}>
 *   - getBatchMetadata(date = new Date()) -> {batchId, category, timestamp, count, description}
 *   - CATEGORIES                          -> readonly list of category ids
 *
 * Pure ES module, no runtime dependencies.
 * ----------------------------------------------------------------------------
 */

/**
 * Human-readable descriptions for each category. Used by getBatchMetadata().
 * @type {Record<string, string>}
 */
const CATEGORY_DESCRIPTIONS = {
  'visual-assets':
    'Abstract wallpapers, digital art, and generative patterns',
  'game-assets':
    'Character concepts, environment art, and prop designs for games',
  industrial:
    'Industrial design product mockups and architectural visualizations',
  education:
    'Educational illustrations and scientific visualizations',
};

/**
 * The full prompt library. Each category holds exactly 30 entries, each with a
 * short `title` and a detailed `prompt` (50-150 words). Entries within a
 * category deliberately vary in art style, color palette, subject, and
 * composition so no two prompts in a batch are near-identical.
 * @type {Record<string, Array<{title: string, prompt: string}>>}
 */
const PROMPT_LIBRARY = {
  // ===========================================================================
  // VISUAL-ASSETS (hours 00-05)
  // Abstract wallpapers, digital art, generative patterns
  // ===========================================================================
  'visual-assets': [
    {
      title: 'Hexagonal Metal Tessellation',
      prompt:
        'A mesmerizing hexagonal tessellation rendered as a photorealistic 3D surface, each hexagon finished in brushed steel and cool cobalt-blue tones with subtly varying reflectivity. Soft directional light from the upper left carves gentle shadows into the recessed grooves between tiles, emphasizing precise geometric repetition. The camera tilts at a slight oblique angle to reveal depth and dimensionality. Ultra-sharp focus, high dynamic range, with faint specular highlights suggesting a polished aluminum substrate. Clean, premium, and modern - ideal as a high-end technology wallpaper.',
    },
    {
      title: 'Marbled Fluid Gold',
      prompt:
        'Abstract marbled fluid art produced by swirling metallic gold, deep teal, and ivory pigments across a glossy black canvas. Organic veins spiral and feather into intricate lacy patterns reminiscent of polished agate stone. Captured straight overhead under even studio lighting that emphasizes the wet, glassy sheen and delicate surface-tension ridges. Rich saturation with luxurious warm-cool contrast, fine detail preserved in the thinnest pigment filaments. Square composition with balanced asymmetry and a sense of slow, frozen motion.',
    },
    {
      title: 'Fractal Valley',
      prompt:
        'A surreal fractal landscape generated in the style of a high-iteration Mandelbrot zoom, rendered as a vast alien valley of spiraling towers and self-similar canyons. Electric violet and cyan gradient into deep indigo across the recursive terrain, with glowing filigree tracing each iteration boundary. A low horizon and atmospheric haze add scale, while a distant twin sun casts long violet shadows. Cinematic wide-angle composition, ultra-detailed, dreamlike and otherworldly, evoking infinite mathematical depth.',
    },
    {
      title: 'Aurora Over Tundra',
      prompt:
        'A breathtaking aurora borealis rippling across a starry polar sky in vivid emerald, magenta, and teal curtains of light, reflected perfectly in a still glacial lake below. Snow-dusted tundra and jagged ice formations frame the foreground in cool blue moonlight. Long-exposure photographic aesthetic with crisp star points, subtle nebula glow, and gentle vertical motion blur in the aurora ribbons. Serene, majestic, ultra-high-resolution natural wallpaper with deep, rich blacks.',
    },
    {
      title: 'Amethyst Geode Core',
      prompt:
        'A cross-section of a colossal amethyst geode photographed from within, its cavity lined with thousands of sharply faceted purple crystals catching warm amber light. Deep violet to pale lavender gradient across the crystal points, with glittering specular highlights and soft volumetric glow. Macro depth of field blurs the far recesses into a purple haze. Dramatic, jewel-like, and meditative, with rich tonal contrast between the dark mineral matrix and the luminous crystal tips.',
    },
    {
      title: 'Stellar Nursery',
      prompt:
        'A vibrant cosmic nebula styled after the Pillars of Creation, with towering columns of luminous gas and dust in deep magenta, gold, and teal. Newly formed stars ignite brilliant points of light throughout the swirling clouds, while gravitational filaments stretch across the frame. Hubble-telescope-inspired photorealism with fine gaseous texture, high dynamic range, and a sense of immense scale. Deep space blackness anchors the composition.',
    },
    {
      title: 'Liquid Mercury Pool',
      prompt:
        'A perfectly still pool of liquid mercury filling the frame, its mirror-like surface reflecting a soft gradient sky of pale peach to lavender. Concentric ripples distort the reflection into elegant sine-wave patterns where an unseen droplet has fallen. Studio macro photography with razor-sharp focus on the ripple crests, capturing the heavy metallic sheen and neutral silver tone. Minimalist, sleek, and hypnotic.',
    },
    {
      title: 'Bioluminescent Tide',
      prompt:
        'Bioluminescent waves crashing on a dark volcanic shore at midnight, each breaking curl glowing electric blue from countless dinoflagellates. The wet black sand mirrors the neon surf, while distant sea stacks silhouette against a star-filled sky. Long-exposure photography aesthetic with silky water motion, vivid cyan luminescence, and deep contrast. Ethereal, serene, and otherworldly, with fine detail in the glowing foam.',
    },
    {
      title: 'Smoke and Ember',
      prompt:
        'Elegant swirling smoke plumes rising against a pure black background, illuminated by a single hard side light that reveals silky filaments in gradients of charcoal, pewter, and faint amber. Tiny glowing embers drift upward like stray stars, adding warm accents to the monochromatic scene. High-speed macro capture freezes the turbulent eddies with crisp detail. Moody, atmospheric, and refined abstract art.',
    },
    {
      title: 'Topographic Contour Map',
      prompt:
        'A stylized topographic contour map rendered as a 3D relief, with concentric elevation lines flowing in warm terracotta, sand, and burnt-orange tones. Soft overhead lighting reveals subtle ridges and valleys, while fine linework traces every meter of elevation change. The composition centers on a dramatic peak with radiating contour rings. Clean, cartographic, and modern, blending data visualization with organic landform beauty.',
    },
    {
      title: 'Voronoi Cellular Pattern',
      prompt:
        'A Voronoi tessellation pattern rendered as frosted glass cells of varying size, each tinted a different shade within a cool palette of mint, sky blue, and pale slate. Backlit translucent illumination reveals soft gradients inside each cell, with crisp white seams separating them. Slight depth offset gives a subtle 3D beveled effect. Minimalist, architectural, and calm - perfect for a clean tech background.',
    },
    {
      title: 'Iridescent Soap Film',
      prompt:
        'Macro photograph of a thin soap film stretched across a frame, displaying swirling bands of iridescent color from thin-film interference - magenta, cyan, gold, and emerald flow into one another in organic, ever-shifting patterns. Black background isolates the luminous membrane, while razor-sharp focus captures microscopic fluid texture. Ethereal, scientific, and mesmerizing, with saturated spectral color and delicate gradients.',
    },
    {
      title: 'Ink Bloom in Water',
      prompt:
        'A single drop of crimson ink dispersing into clear water, captured at the moment it blooms into an elegant mushroom-cloud plume. Wispy tendrils trail outward in slow motion, with finer ink filaments creating lacy secondary structures. Lit from behind with soft white light for high contrast against a clean backdrop. Fluid dynamics art, dramatic and graceful, with rich red saturation and pristine clarity.',
    },
    {
      title: 'Sonic Waveform Field',
      prompt:
        'An abstract visualization of sound rendered as overlapping sine waves floating in 3D space, each wave a different hue within a neon palette of electric pink, cyan, and yellow. Glowing wavefronts ripple outward from a central source, with motion-blurred trails suggesting vibration. Dark background with a subtle grid floor for depth. Energetic, futuristic, and rhythmic - ideal audio-tech imagery.',
    },
    {
      title: 'Circuit Garden',
      prompt:
        'A macro view of an intricate printed circuit board reimagined as a flourishing garden, where golden conductive traces branch like vines and tiny surface-mount components bloom as crystalline flowers. Cool blue solder mask provides a lush backdrop, while soft bokeh highlights sparkle like dew. Top-down flat lay with even lighting, ultra-detailed, blending technology and organic growth in a serene pastel-cool palette.',
    },
    {
      title: 'Geode Slice Spectrum',
      prompt:
        'A polished slice of a banded agate geode displayed against a soft white background, revealing concentric rings of warm amber, honey, cream, and faint blue chalcedony. Crisp studio lighting accentuates the translucent banding and fine crystalline texture at the center. Square composition with the geode perfectly centered, evoking natural geometry and earthy elegance. Photorealistic, calming, and richly detailed.',
    },
    {
      title: 'Coral Reef Abstraction',
      prompt:
        'An abstract top-down view of a vibrant coral reef, stylized as a tapestry of branching corals, brain corals, and sea fans in saturated teal, coral pink, and sunshine yellow. Dappled sunlight filters through clear turquoise water, casting moving caustic patterns across the seabed. Rich texture and biodiversity suggested without literal fish. Luminous, tropical, and painterly, with a soothing aquatic palette.',
    },
    {
      title: 'Stained Glass Mosaic',
      prompt:
        'An Art-Nouveau-inspired stained glass window depicting an abstract sunburst, assembled from hand-cut panels in jewel tones of ruby, sapphire, emerald, and amber. Leading lines of dark solder define each segment, while backlight streams through to create glowing, saturated color with subtle texture variation in the glass. Symmetrical, ornate, and luminous, photographed straight-on for crisp geometric clarity.',
    },
    {
      title: 'Holographic Foil Sheet',
      prompt:
        'A crumpled sheet of holographic foil photographed under shifting light, its surface rippling with rainbow refractions in pink, blue, and gold. Deep creases and gentle ripples create a chaotic yet elegant topography of spectral color. Macro detail captures fine metallic texture and sharp specular highlights. Futuristic, glamorous, and abstract, set against a soft neutral background to let the color shine.',
    },
    {
      title: 'Aurora Over Fjord',
      prompt:
        'A vivid green and violet aurora dancing over a narrow Scandinavian fjord, its light mirrored in the glassy dark water between sheer granite cliffs. A lone red wooden cabin glows warmly on the shore, providing human scale. Long-exposure landscape photography with crisp stars, mist drifting along the water, and rich cool tones. Atmospheric, tranquil, and majestic natural wallpaper.',
    },
    {
      title: 'Sahara Dune Ripples',
      prompt:
        'Aerial view of rippled Saharan sand dunes at golden hour, their wind-carved ridges casting deep violet shadows that accentuate the sensuous curves of the landscape. Warm amber and honey tones grade into cool blue in the shaded troughs. Minimalist composition with strong leading lines and abstract organic forms. Hyper-detailed, serene, and sculptural, evoking the artistry of wind on sand.',
    },
    {
      title: 'Bubble Cluster Macro',
      prompt:
        'A tight cluster of translucent soap bubbles photographed at macro scale, each sphere reflecting a soft pastel environment of peach, mint, and lavender. Thin-film iridescence paints the bubble membranes with shifting bands of color, while sharp focus reveals microscopic surface texture. Soft diffuse lighting, shallow depth of field, and a clean white background. Delicate, playful, and scientifically beautiful.',
    },
    {
      title: 'Desert Lightning Storm',
      prompt:
        'A dramatic desert lightning storm at dusk, with multiple violet-white bolts branching across a moody indigo sky above rugged red-rock mesas. A wall of rain curtains the distant horizon, illuminated from within by hidden flashes. Long-exposure photography captures the branching electricity in crisp detail, with warm rock tones contrasting the cool storm light. Powerful, cinematic, and elemental.',
    },
    {
      title: 'Chromatic Aberration Bloom',
      prompt:
        'An abstract digital artwork exploring chromatic aberration, where a central bright bloom fringes into separated red, green, and blue channels that fan outward across a dark frame. Glowing geometric shards overlap with misaligned color edges, creating a glitch-aesthetic halo. Crisp digital rendering with smooth gradients and high contrast. Futuristic, tech-forward, and visually striking, ideal for a creative studio backdrop.',
    },
    {
      title: 'Glass Caustic Light',
      prompt:
        'Macro photograph of light caustics projected through a textured glass block onto a smooth surface, forming flowing networks of bright filaments in warm gold and cool white. The refracted light creates organic, web-like patterns that shift across the frame, with deep soft shadows between them. Elegant, minimal, and luminous, capturing the poetry of optics in a refined abstract composition.',
    },
    {
      title: 'Magnetic Field Lines',
      prompt:
        'A scientific visualization of magnetic field lines around a bar magnet, rendered as glowing cerulean filaments arcing from north to south poles through a dark void. Iron-filing-like particles trace the curves, denser near the poles, with subtle bloom and depth. Clean, educational, and elegant, with a cool monochromatic palette and crisp 3D rendering. Ideal as a refined physics-inspired wallpaper.',
    },
    {
      title: 'Ancient Tree Rings',
      prompt:
        'A polished cross-section of an ancient tree trunk displayed against a dark walnut background, revealing hundreds of concentric growth rings in gradients of honey, caramel, and deep umber. Knots and radial cracks add character, while raking light emphasizes the fine grain texture. Warm, earthy, and meditative, with a strong sense of time and natural history captured in a single frame.',
    },
    {
      title: 'Mineral Striation Slab',
      prompt:
        'A polished slab of banded iron formation showing striking striations of metallic silver hematite alternating with rust-red jasper and golden tiger-eye. Raking light accentuates the chatoyant shimmer and layered geological history. Macro detail reveals fine crystalline texture and subtle color shifts. Earthy, luxurious, and texturally rich, photographed straight-on on a matte black background for maximum contrast.',
    },
    {
      title: 'Lenticular Cloud Sunset',
      prompt:
        'A sky filled with stacked lenticular clouds glowing pink and gold at sunset, their smooth lens shapes catching the last warm light against a deepening blue gradient. A distant mountain silhouette anchors the lower frame. Wide landscape photography with crisp cloud definition, soft atmospheric haze, and rich color transition. Calm, surreal, and painterly - an elegant natural abstract.',
    },
    {
      title: 'Quantum Particle Field',
      prompt:
        'An abstract visualization of a quantum particle field, with thousands of tiny glowing nodes connected by faint luminous filaments forming a dynamic 3D mesh. Nodes pulse in shades of electric blue, violet, and white against deep space black, with selective bloom on the brightest points. Subtle depth of field and motion suggest energetic vibration. Futuristic, scientific, and mesmerizing, ideal tech wallpaper.',
    },
  ],

  // ===========================================================================
  // GAME-ASSETS (hours 06-11)
  // Character concepts, environment art, prop designs
  // ===========================================================================
  'game-assets': [
    {
      title: 'Elven Ranger Portrait',
      prompt:
        'A character concept portrait of a stoic elven ranger, with angular features, weathered leather armor, and a hooded forest-green cloak. A finely carved longbow rests over one shoulder, and a quiver of feathered arrows peeks behind. Piercing amber eyes and intricate vine tattoos along the jawline. Painterly digital art style with soft rim lighting, detailed textures, and a muted earthy palette. Three-quarter view, fantasy realism.',
    },
    {
      title: 'Cyberpunk City Alley',
      prompt:
        'A neon-drenched cyberpunk city alley at night, with towering skyscrapers crowded overhead and tangled cables above. Rain-slicked pavement reflects vivid magenta, cyan, and yellow signage in Mandarin and English. Steam vents, holographic advertisements, and a distant flying car. Gritty cinematic concept art, dramatic atmospheric perspective, cool palette with warm neon accents. Wide establishing shot, highly detailed.',
    },
    {
      title: 'Energy Sword Concept',
      prompt:
        'A weapon concept sheet for a futuristic energy sword, with a sleek obsidian hilt and a crackling plasma blade glowing electric blue. Embedded cooling vents and glowing runes along the grip. Displayed against a neutral studio backdrop with an orthographic side view and faint construction lines. Industrial sci-fi design, clean linework, sharp specular highlights, and a refined cool-toned palette.',
    },
    {
      title: 'Hover Tank Blueprint',
      prompt:
        'A heavily armored military hover tank suspended on glowing repulsor vents, with a compound angular hull in desert-tan and gunmetal camouflage. A triple-barreled turret and reactive armor plates line the hull. Three-quarter hero view against a dramatic sky with soft volumetric lighting. Hard-surface sci-fi concept art, weathered battle damage, and crisp mechanical detail. Imposing and battle-ready.',
    },
    {
      title: 'Ancient Dragon Study',
      prompt:
        'A majestic ancient dragon perched on a craggy mountain peak, its scales shimmering in deep emerald and bronze. Massive leathery wings half-folded, glowing amber eyes, and smoke curling from its nostrils. Fantasy creature concept art, painterly with dramatic side lighting, intricate scale texture, and a misty valley far below. Heroic low-angle composition, epic and awe-inspiring.',
    },
    {
      title: 'Enchanted Forest Glade',
      prompt:
        'An enchanted forest glade bathed in soft golden light filtering through a canopy of giant bioluminescent mushrooms and ancient oaks. Fireflies drift among glowing blue wildflowers, and a crystal-clear stream winds through mossy stones. Painterly fantasy environment art, atmospheric god rays, lush green palette with magical accents. Wide establishing shot, serene and mystical, highly detailed foliage.',
    },
    {
      title: 'Space Marine Armor',
      prompt:
        'A battle-hardened space marine in powered exoskeleton armor, scarred gunmetal plating with a glowing orange visor and faction insignia. Holding a bulky plasma rifle at rest. Character concept art, three-quarter view, dramatic rim lighting against a smoky battlefield backdrop. Hard-surface sci-fi design with weathered textures, utilitarian color palette, and imposing heroic proportions.',
    },
    {
      title: 'Alchemy Potion Set',
      prompt:
        'A prop design of three ornate alchemy potions on a wooden apothecary shelf: a swirling emerald elixir, a glowing golden cure, and a bubbling violet poison, each in a distinct hand-blown glass flask with leather and brass accents. Warm candlelight, soft bokeh, detailed glass refraction, and rich fantasy still-life styling. Top-down three-quarter view, painterly and atmospheric.',
    },
    {
      title: 'Explorer Starship',
      prompt:
        'A sleek deep-space exploration starship with swept-back wings and glowing blue ion engines, cruising past a ringed gas giant. White-and-chrome hull with subtle faction markings and running lights. Sci-fi vehicle concept art, cinematic three-quarter hero shot, dramatic cosmic lighting, and crisp hard-surface detailing. Cool palette with warm engine glow, sense of scale and adventure.',
    },
    {
      title: 'Abyssal Leviathan',
      prompt:
        'A colossal abyssal leviathan emerging from the dark ocean depths, its serpentine body covered in bioluminescent blue spots and trailing glowing tendrils. Massive jaws lined with translucent teeth, tiny submarine for scale. Creature concept art, painterly with dramatic underwater lighting, volumetric god rays fading into blackness, and a moody cool palette. Awe-inspiring and ominous.',
    },
    {
      title: 'Runic Battle Axe',
      prompt:
        'A weapon concept for a heavy runic battle axe, with a double-headed steel blade etched with glowing crimson runes and a haft wrapped in worn leather and iron bands. Displayed upright against a dark stone backdrop with an ember-lit atmosphere. Fantasy prop design, painterly with strong directional light, weathered metal texture, and a warm fiery palette. Imposing and ancient.',
    },
    {
      title: 'Volcanic Wasteland',
      prompt:
        'A desolate volcanic wasteland with rivers of glowing lava carving through black basalt plains, charred obsidian spires, and an ash-choked orange sky. A ruined fortress silhouette in the distance. Environment concept art, cinematic wide shot, dramatic atmospheric haze, intense warm palette contrasted with deep black rock. Foreboding, epic, and richly textured. Highly detailed terrain.',
    },
    {
      title: 'Steampunk Inventor',
      prompt:
        'A quirky steampunk inventor character with brass goggles pushed up on a top hat, a leather apron over a pinstripe vest, and a mechanical prosthetic arm bristling with tiny gears and gauges. Holding a glowing prototype device. Character concept art, three-quarter view, warm sepia and copper palette, painterly with soft window light. Charming, detailed Victorian sci-fi styling.',
    },
    {
      title: 'Ancient Relic Artifact',
      prompt:
        'A prop design for an ancient relic artifact: a floating crystalline orb suspended within a corroded bronze tripod, inscribed with faded golden hieroglyphs that faintly glow. Resting on a dusty stone pedestal in a torch-lit tomb. Fantasy prop concept, dramatic chiaroscuro lighting, rich earth tones with magical amber glow, painterly and mysterious. Centered hero composition.',
    },
    {
      title: 'Combat Mecha Suit',
      prompt:
        'A towering combat mecha suit with heavy bipedal legs, a missile-laden shoulder rack, and a chain-gun arm, painted in weathered urban gray with yellow caution stripes. Cockpit canopy glows blue. Hard-surface sci-fi concept art, heroic three-quarter low-angle view against a smoky skyline, dramatic lighting, crisp mechanical detail. Imposing, militaristic, and battle-worn.',
    },
    {
      title: 'Forest Spirit Guardian',
      prompt:
        'A graceful forest spirit guardian woven from living wood, vines, and glowing fireflies, with antler-like branches and luminous green eyes. Floating slightly above a mossy forest floor. Fantasy creature concept art, ethereal painterly style, soft dappled light, lush green palette with magical golden accents. Serene, mystical, and delicate. Three-quarter view, intricate organic detail.',
    },
    {
      title: 'Floating Islands Vista',
      prompt:
        'A breathtaking vista of floating islands suspended in a golden-hour sky, with cascading waterfalls vanishing into mist below, rope bridges connecting lush green plateaus, and windmills perched on edges. Fantasy environment art, painterly cinematic wide shot, warm sunset palette with cool atmospheric haze, god rays. Whimsical, epic, and richly detailed. Strong sense of wonder.',
    },
    {
      title: 'Plasma Rifle Design',
      prompt:
        'A weapon concept sheet for a sleek bullpup plasma rifle, with a matte white polymer body, glowing cyan energy cell, and angular ergonomic grip. Displayed in orthographic side view with faint technical callouts on a neutral grid background. Hard-surface sci-fi design, clean studio lighting, crisp reflections, cool palette. Modern, functional, and refined industrial design.',
    },
    {
      title: 'Necromancer Warlock',
      prompt:
        'A sinister necromancer warlock draped in tattered black robes, with a skeletal hand raised to summon wisps of glowing green soul energy. A crow perches on his shoulder, and shadowy tendrils curl around his feet. Character concept art, three-quarter view, dramatic low-key lighting, desaturated palette with eerie green accents. Painterly, gothic, and menacing.',
    },
    {
      title: 'Ornate Treasure Chest',
      prompt:
        'A prop design for an ornate wooden treasure chest bound in wrought-iron bands, with a golden lock and carvings of coiled dragons. Lid slightly ajar, spilling warm golden light and the glint of coins within. Resting in a torch-lit dungeon alcove. Fantasy prop concept, painterly with rich warm palette, dramatic lighting, and detailed wood and metal textures. Mysterious and inviting.',
    },
    {
      title: 'Pirate Airship Galleon',
      prompt:
        'A swashbuckling pirate airship galleon with a wooden hull, tattered sails, and a massive patched balloon overhead, trailing smoke from its brass engines. Jolly Roger flag snapping in the wind. Vehicle concept art, dramatic three-quarter view against a sunset sky with fluffy clouds, painterly with warm golden palette and weathered textures. Adventurous, whimsical, and richly detailed.',
    },
    {
      title: 'Ice Golem Behemoth',
      prompt:
        'A massive ice golem behemoth formed from jagged glacial shards, with glowing cyan eyes and frost billowing from its shoulders. Crystalline body refracts cold blue light. Creature concept art, heroic low-angle view against a snowy blizzard backdrop, painterly with dramatic rim light, cool monochromatic palette with bright accents. Imposing, ancient, and elemental.',
    },
    {
      title: 'Sunken Underwater City',
      prompt:
        'A sunken underwater city of crumbling marble temples and coral-encrusted statues, with shafts of sunlight piercing the turquoise water and schools of fish drifting through. Bioluminescent flora clings to ruins. Environment concept art, cinematic wide shot, atmospheric haze, cool aquatic palette with warm light accents. Mysterious, melancholic, and beautiful. Richly detailed.',
    },
    {
      title: 'Arcane Crystal Staff',
      prompt:
        'A weapon concept for an arcane crystal staff, with a gnarled dark-wood shaft topped by a floating violet crystal emitting swirling magical runes. Leather-wrapped grip with silver filigree. Displayed upright against a mystical starry backdrop. Fantasy prop design, painterly with soft magical glow, cool purple palette with silver accents. Elegant, powerful, and detailed.',
    },
    {
      title: 'Companion Robot Drone',
      prompt:
        'A friendly companion robot drone with a rounded white chassis, expressive blue LED eyes, hovering via tiny ducted fans, and a small manipulator arm. Sci-fi character concept, three-quarter view against a soft studio backdrop, clean product-style lighting, cool palette with cheerful accents. Cute, approachable, and modern hard-surface design with crisp detailing.',
    },
    {
      title: 'Ancient Spellbook Grimoire',
      prompt:
        'A prop design for an ancient spellbook grimoire, with a cracked leather cover bound in tarnished silver, a glowing pentagram clasp, and pages edged in gold. Faint magical runes drift from its open pages. Resting on a candlelit desk with quill and ink. Fantasy prop concept, painterly with warm dramatic lighting and a rich earthy palette. Mysterious, detailed, and atmospheric.',
    },
    {
      title: 'Wasteland Desert Buggy',
      prompt:
        'A rugged post-apocalyptic desert buggy with oversized knobby tires, a rusted roll cage, and a jury-rigged machine gun mount. Patchwork metal body in faded tan and red, with scavenged parts and jerry cans. Vehicle concept art, dramatic three-quarter view against a dusty desert horizon, painterly with warm gritty palette and weathered textures. Aggressive, utilitarian, and detailed.',
    },
    {
      title: 'Phoenix Rebirth',
      prompt:
        'A magnificent phoenix ablaze with golden and crimson flames, wings spread wide as it rises from a nest of glowing embers. Trails of fire and sparks follow its ascent against a dark sky. Creature concept art, painterly with dramatic fiery lighting, intense warm palette with deep black contrast. Epic, symbolic, and richly detailed feathers.',
    },
    {
      title: 'Frozen Tundra Stronghold',
      prompt:
        'A fortified stronghold carved into a frozen tundra cliffside, with icicle-draped stone walls, glowing forge windows, and banners snapping in a blizzard. A frozen sea stretches to the horizon under aurora light. Environment concept art, cinematic wide establishing shot, cold blue palette with warm window accents, atmospheric snow haze. Harsh, epic, and detailed.',
    },
    {
      title: 'Shadow Assassin Rogue',
      prompt:
        'A lithe shadow assassin rogue clad in form-fitting black leather armor with a hooded cowl, twin curved daggers, and a bandolier of throwing knives. Piercing pale eyes gleam from the shadow of the hood. Character concept art, three-quarter crouching pose, dramatic low-key lighting, desaturated palette with subtle purple accents. Painterly, stealthy, and menacing.',
    },
  ],

  // ===========================================================================
  // INDUSTRIAL (hours 12-17)
  // Product mockups, architectural visualization, industrial design
  // ===========================================================================
  industrial: [
    {
      title: 'Smartphone Product Render',
      prompt:
        'A photorealistic product render of a flagship smartphone with a bezel-less edge-to-edge display, triple-camera array in a matte black glass back, and a polished titanium frame. Floating at a three-quarter angle against a soft gradient studio background with a subtle reflection beneath. Crisp specular highlights, ultra-clean studio lighting, neutral cool palette. Premium, minimal, and modern industrial design.',
    },
    {
      title: 'Concept Sports Car',
      prompt:
        'A sleek concept sports car with a low aggressive stance, sculpted aerodynamic body in glossy candy-red, and glowing LED accent lights. Sharp character lines and a transparent canopy. Automotive design render, dramatic three-quarter hero view in a dark studio with a reflective floor and soft rim lighting. Cinematic, high-end, with crisp reflections and a premium feel.',
    },
    {
      title: 'Mid-Century Lounge Chair',
      prompt:
        'A mid-century modern lounge chair with a molded walnut plywood shell and emerald-green leather upholstery, on a slender black steel swivel base. Photorealistic product render in a bright minimalist room with soft daylight, polished concrete floor, and a single potted plant. Warm wood tones, refined materials, and crisp shadows. Elegant, timeless furniture design.',
    },
    {
      title: 'Luxury Perfume Bottle',
      prompt:
        'A luxury perfume bottle design with a faceted crystal body, a gold-finished cap, and a subtle amber liquid inside. Resting on a polished marble surface with soft drapery and a single white orchid. Photorealistic product photography, dramatic side lighting with rich highlights and deep shadows, warm elegant palette. Sophisticated, sensual, and premium packaging design.',
    },
    {
      title: 'Modern Villa Exterior',
      prompt:
        'A modern minimalist villa exterior with clean white volumes, floor-to-ceiling glass, and a flat roof, set into a hillside at dusk. Warm interior glow contrasts the cool twilight sky, with an infinity pool reflecting the architecture. Landscape and tree silhouettes frame the scene. Architectural visualization, photorealistic, cinematic wide shot, refined material palette.',
    },
    {
      title: 'Office Lobby Interior',
      prompt:
        'A contemporary office lobby interior with a double-height atrium, polished concrete floors, a living green wall, and a sculptural reception desk in white Corian. Soft daylight floods through floor-to-ceiling glazing. Minimalist designer furniture, neutral palette with lush green accents. Architectural visualization, photorealistic wide-angle view, crisp reflections, refined and professional. A sculptural pendant light fixture anchors the space, and minimalist wayfinding signage reinforces the calm, professional atmosphere.',
    },
    {
      title: 'Premium Over-Ear Headphones',
      prompt:
        'A photorealistic product render of premium over-ear headphones with matte black aluminum ear cups, memory-foam leather cushions, and a brushed stainless steel headband. Floating three-quarter view against a soft dark gradient background with dramatic rim lighting and a subtle reflection. Crisp material detail, cool monochromatic palette. Sleek, premium industrial design.',
    },
    {
      title: 'Electric Motorcycle',
      prompt:
        'A futuristic electric motorcycle with a sleek aerodynamic fairing, exposed carbon-fiber frame, and a glowing blue hub motor. Matte gunmetal body with yellow accent lines. Automotive design render, dramatic three-quarter hero view on a dark reflective surface with studio lighting. Aggressive, modern, and high-tech with crisp reflections and detailed mechanical components.',
    },
    {
      title: 'Sculptural Dining Table',
      prompt:
        'A sculptural dining table with a single-slab live-edge walnut top supported by a flowing cast-bronze base. Set in a warm minimalist dining room with linen chairs, a linen pendant light, and soft daylight. Photorealistic furniture render, refined material palette of warm wood and bronze, crisp shadows and rich grain detail. Elegant, artisanal industrial design.',
    },
    {
      title: 'Craft Beverage Can Design',
      prompt:
        'A sleek aluminum beverage can design with a matte pastel mint finish, minimalist geometric label, and subtle embossed texture. Photographed on a clean white surface with a soft shadow and light condensation. Three-quarter floating view, bright studio lighting, fresh cool palette. Photorealistic product render, modern, refreshing, and refined packaging design.',
    },
    {
      title: 'Glass Skyscraper Facade',
      prompt:
        'A soaring glass skyscraper with a faceted curtain-wall facade reflecting a clear blue sky and scattered clouds. Strong upward perspective emphasizing height, with surrounding towers receding into atmospheric haze. Architectural visualization, photorealistic, crisp reflective glass, cool blue palette with warm sun highlights. Modern, monumental, and detailed urban design. Crisp vertical mullions lead the eye toward a bright sun flare, while subtle rooftop detailing and mechanical floors reveal the layered program of the building.',
    },
    {
      title: 'Modern Kitchen Interior',
      prompt:
        'A modern kitchen interior with flat-panel matte sage-green cabinets, a white quartz waterfall island, brushed brass fixtures, and oak flooring. Soft morning light through a large window, a vase of eucalyptus on the counter. Architectural visualization, photorealistic wide view, warm-cool balanced palette, crisp material textures. Clean, inviting, and contemporary design.',
    },
    {
      title: 'Smartwatch Product Render',
      prompt:
        'A photorealistic product render of a premium smartwatch with a rounded square AMOLED display, a titanium case, and a woven sport band in deep ocean blue. Floating three-quarter view against a soft light-gray gradient with a subtle shadow. Crisp screen glow, refined metallic reflections, modern cool palette. Sleek, wearable industrial design.',
    },
    {
      title: 'Electric SUV Hero Shot',
      prompt:
        'A rugged-yet-refined electric SUV with a boxy modern silhouette, two-tone matte white and black body, and slim LED light bars. Shown in a dramatic three-quarter hero view on a wet reflective asphalt surface at dusk, with city bokeh behind. Automotive design render, cinematic lighting, crisp reflections, premium cool palette with warm accent lights.',
    },
    {
      title: 'Modular Bookshelf System',
      prompt:
        'A modular bookshelf system with matte black steel frames and warm oak shelves of varying depths, styled with books, ceramics, and trailing plants. Set against a textured plaster wall in a bright living room with soft daylight. Photorealistic furniture render, balanced warm-cool palette, crisp shadows and material detail. Modern, functional, and architectural.',
    },
    {
      title: 'Cosmetic Cream Jar',
      prompt:
        'A luxury cosmetic cream jar with a frosted glass body, a rose-gold lid, and a subtle pearl-toned cream inside. Resting on a soft pink marble surface with delicate shadows, eucalyptus sprigs, and diffused light. Photorealistic product render, three-quarter view, soft elegant palette, refined reflections. Feminine, premium, and clean packaging design.',
    },
    {
      title: 'Cable-Stayed Bridge',
      prompt:
        'A sweeping cable-stayed bridge with a single tapering white pylon and radiating steel cables, spanning a misty river at blue hour. Soft city lights glow in the distance, with calm water reflecting the structure. Architectural visualization, photorealistic cinematic wide shot, cool twilight palette with warm light accents. Monumental, elegant, and detailed engineering design.',
    },
    {
      title: 'Serene Bedroom Interior',
      prompt:
        'A serene bedroom interior with a low platform bed in oatmeal linen, a textured plaster accent wall, warm oak flooring, and a single arc lamp. Soft morning light filters through sheer curtains, casting gentle shadows. Minimalist styling with a small vase of branches. Architectural visualization, photorealistic, warm neutral palette, crisp material textures. Calm, refined design.',
    },
    {
      title: 'Ultrathin Laptop Render',
      prompt:
        'A photorealistic product render of an ultrathin laptop with a CNC-milled aluminum body in space gray, a vivid edge-to-edge display showing a colorful abstract wallpaper, and a backlit keyboard. Open at a three-quarter angle on a soft neutral surface with subtle reflection. Crisp studio lighting, cool metallic palette, refined specular highlights. Premium industrial design.',
    },
    {
      title: 'Track-Focused Hypercar',
      prompt:
        'A track-focused hypercar with an extreme aerodynamic body in glossy exposed carbon fiber and satin orange accents, a massive rear wing, and a transparent engine cover revealing the V12. Automotive design render, dramatic three-quarter low-angle hero view in a dark studio with a reflective floor and rim lighting. Cinematic, aggressive, and ultra-detailed.',
    },
    {
      title: 'Modular Sofa Design',
      prompt:
        'A modular sofa with deep seats in boucle fabric in warm sand, oversized back cushions, and a low oak platform base. Styled with textured throw pillows and a wool blanket in a sunlit living room with oak flooring. Photorealistic furniture render, soft daylight, warm neutral palette with rich fabric texture. Cozy, contemporary, and inviting.',
    },
    {
      title: 'Artisan Food Box Packaging',
      prompt:
        'An artisan food box packaging design with a kraft paper sleeve, minimal hand-lettered label, and a window revealing assorted gourmet treats inside. Photographed on a rustic wood table with natural linen and soft daylight. Three-quarter view, warm earthy palette, photorealistic product render with crisp paper texture. Honest, craft, and wholesome design.',
    },
    {
      title: 'Contemporary Art Museum',
      prompt:
        'A contemporary art museum exterior with bold sculptural white concrete forms, a cantilevered entrance, and large glazed openings. Set in a landscaped plaza with reflecting pools and sculpture at golden hour. Architectural visualization, photorealistic cinematic wide shot, warm sunset palette with crisp material detail. Iconic, monumental, and refined cultural design.',
    },
    {
      title: 'Spa-Like Bathroom',
      prompt:
        'A spa-like bathroom interior with large-format travertine walls, a freestanding sculptural soaking tub, brushed bronze fixtures, and an oak vanity. Soft diffused daylight from a skylight, with a single orchid and rolled towels. Architectural visualization, photorealistic wide view, warm neutral palette, crisp material textures and reflections. Serene, luxurious design. A textured pebble niche holds toiletries, and soft greenery introduces a natural, restorative accent to the serene space.',
    },
    {
      title: 'Minimalist Smart Speaker',
      prompt:
        'A photorealistic product render of a minimalist smart speaker with a seamless woven fabric body in warm gray, a subtle LED light ring at the base, and a smooth top surface. Floating three-quarter view against a soft neutral gradient with a gentle shadow. Crisp studio lighting, refined material detail, neutral palette. Modern, friendly industrial design.',
    },
    {
      title: 'Autonomous Pod Vehicle',
      prompt:
        'A futuristic autonomous mobility pod with a rounded glass capsule cabin, glossy white lower body, and a lounge-style interior visible inside. Shown in a clean urban plaza at dusk with soft reflections. Automotive design render, three-quarter hero view, soft cinematic lighting, cool palette with warm interior glow. Friendly, modern, and visionary.',
    },
    {
      title: 'Architectural Desk Lamp',
      prompt:
        'An architectural desk lamp with a slender matte black arm, counterweighted joints, and a conical head in spun aluminum, casting a warm focused pool of light on a wooden desk with a notebook and pen. Photorealistic product render, dramatic low-key lighting, warm-cool contrast, crisp metallic detail. Minimal, functional, and refined industrial design.',
    },
    {
      title: 'Luxury Gift Box Set',
      prompt:
        'A luxury gift box set with a rigid matte black outer box, gold-foil debossed logo, and a magnetic lid opening to reveal nestled products in silk. Photographed on a dark marble surface with dramatic side lighting and soft shadows. Photorealistic product render, three-quarter open view, rich dark palette with gold accents. Premium, sophisticated packaging design.',
    },
    {
      title: 'Modern Stadium Architecture',
      prompt:
        'A modern stadium exterior with a sweeping white steel roof, translucent ETFE panels, and a faceted concrete base, illuminated at night with subtle color-changing LED accents. Surrounding plaza with pedestrians for scale. Architectural visualization, photorealistic cinematic wide shot, dramatic night palette with crisp reflections. Monumental, dynamic, and iconic design. Curving pedestrian pathways guide visitors toward the entrances, and the illuminated roof appears to float above the glowing plaza.',
    },
    {
      title: 'Fine-Dining Restaurant Interior',
      prompt:
        'A fine-dining restaurant interior with intimate banquette seating in deep emerald velvet, dark walnut paneling, brass pendant lights, and a sculptural bar. Warm low lighting with candle glow on tables, polished concrete floor. Architectural visualization, photorealistic wide view, moody warm palette with rich material textures. Sophisticated, atmospheric, and luxurious design.',
    },
  ],

  // ===========================================================================
  // EDUCATION (hours 18-23)
  // Educational illustrations, scientific visualization, infographic art
  // ===========================================================================
  education: [
    {
      title: 'Animal Cell Structure',
      prompt:
        'An educational cross-section illustration of an animal cell, labeling the nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, and cell membrane in a clean, modern infographic style. Soft translucent 3D rendering with a cool blue and teal palette, gentle lighting, and crisp annotations. Scientific yet approachable, suitable for a biology textbook. Highly detailed organelles with subtle textures.',
    },
    {
      title: 'Visible Light Spectrum',
      prompt:
        'A scientific visualization of the visible light spectrum, showing a continuous rainbow gradient from violet to red, with a prism splitting white light into its component wavelengths. Wavelength labels in nanometers along the bottom. Clean minimalist infographic style on a soft white background, crisp typography, vivid spectral colors. Educational, elegant, and accurate.',
    },
    {
      title: 'Geometric Solids Study',
      prompt:
        'An educational illustration of geometric solids - cube, sphere, cone, cylinder, pyramid, and torus - rendered in soft 3D with subtle shading and labeled in a clean layout. Warm pastel palette on a light background, with faint construction lines and annotations. Modern infographic style, crisp and approachable, ideal for a mathematics concept reference. Balanced composition.',
    },
    {
      title: 'Ancient Roman Forum',
      prompt:
        'An educational historical scene of the ancient Roman Forum at its peak, with marble temples, colonnades, and bustling citizens in togas. Warm golden sunlight, painterly realistic style with architectural accuracy, atmospheric perspective. Labeled key structures in a subtle caption style. Rich earthy palette, ideal for a history textbook spread. Detailed and immersive.',
    },
    {
      title: 'Computer Architecture Diagram',
      prompt:
        'An educational infographic of computer architecture, showing CPU, memory, storage, and I/O connected by data buses, with a clean isometric 3D style. Cool blue and slate palette, soft lighting, labeled components and data-flow arrows. Modern, approachable tech illustration suitable for a computer science concept. Crisp geometry and clear hierarchy. Directional arrows indicate the flow of data between components, and a concise legend clarifies each labeled element for readers.',
    },
    {
      title: 'DNA Double Helix',
      prompt:
        'A scientific visualization of the DNA double helix, with twisting strands in blue and green, color-coded base pairs (A-T, G-C) as connecting rungs, and a softly glowing molecular atmosphere. Clean 3D render on a dark background, labeled base pairs, elegant and educational. Crisp detail, cool palette with bright accents. A subtle scale bar and a simplified base-pairing key anchor the corner, helping readers connect structure to genetic function.',
    },
    {
      title: 'Atomic Bohr Model',
      prompt:
        'An educational illustration of a Bohr atomic model, showing a glowing nucleus of protons and neutrons with electrons orbiting in defined shells. Clean vector-style 3D render on a soft gradient background, labeled subatomic particles. Cool blue and amber palette, crisp and modern. Scientifically approachable, ideal for a chemistry concept. A small legend distinguishes protons, neutrons, and electrons, and a faint electron-energy label clarifies each defined shell.',
    },
    {
      title: 'Mandelbrot Fractal Zoom',
      prompt:
        'An educational visualization of the Mandelbrot set, rendered as a deep zoom revealing self-similar spirals and seahorse valleys in vivid electric blue, violet, and gold. Mathematical beauty emphasized, with a soft caption explaining iteration. Dark background, crisp fractal detail, cool vibrant palette. Elegant bridge between mathematics and art. Smooth gradient banding highlights the boundary between order and chaos, inviting the viewer to explore the infinite self-similar detail.',
    },
    {
      title: 'Medieval Castle Cross-Section',
      prompt:
        'An educational cross-section illustration of a medieval castle, revealing the keep, great hall, dungeons, and battlements with tiny figures going about daily life. Warm painterly storybook style, labeled key areas, earthy palette with stone and timber textures. Detailed, charming, and informative - ideal for a history concept reference. Tiny labeled figures illustrate daily medieval life, from cooking in the great hall to standing watch along the battlements.',
    },
    {
      title: 'Internet Network Topology',
      prompt:
        'An educational infographic of internet network topology, showing servers, routers, data centers, and end-user devices connected by glowing data pathways across a stylized world map. Cool blue palette on a dark background, animated-looking data pulses, labeled components. Modern, clean tech illustration suitable for a networking concept. Crisp and approachable. A legend distinguishes servers, routers, and end devices, and subtle regional labels ground the abstract network in real geography.',
    },
    {
      title: 'Photosynthesis Diagram',
      prompt:
        'An educational illustration of photosynthesis, showing a leaf cross-section with chloroplasts absorbing sunlight, taking in CO2 and water, and releasing oxygen and glucose. Labeled arrows and chemical summary. Clean infographic style on a soft green background, warm sunlight accents, crisp 3D-rendered cells. Scientific yet approachable, ideal for biology. A concise chemical equation anchors the corner of the composition, reinforcing the transformation of light energy into chemical energy.',
    },
    {
      title: 'Wave Mechanics Visualization',
      prompt:
        'A scientific visualization of wave mechanics, showing transverse and longitudinal waves with labeled amplitude, wavelength, and frequency, propagating across the frame. Clean 3D line render on a soft gradient background, cool blue palette with bright crest highlights. Crisp, modern, and educational - suitable for a physics concept reference. Side-by-side examples compare water waves and sound waves, helping learners connect the abstract model to familiar physical phenomena.',
    },
    {
      title: 'Fibonacci Spiral in Nature',
      prompt:
        'An educational illustration of the Fibonacci spiral overlaid on a nautilus shell, sunflower, and pinecone, demonstrating the golden ratio in nature. Warm earthy palette with soft golden spiral lines and labeled sequence numbers. Clean infographic style, painterly natural elements, elegant and inspiring. Bridge between mathematics and the natural world. A golden ratio equation anchors the corner, linking the visual spiral to its precise mathematical definition for curious readers.',
    },
    {
      title: 'Industrial Revolution Scene',
      prompt:
        'An educational historical scene of the Industrial Revolution, showing a smoky factory district with steam engines, textile mills, and workers in period clothing. Warm sepia and ember palette, painterly realistic style with atmospheric haze. Labeled key innovations in a subtle caption style. Rich, detailed, ideal for a history textbook spread.',
    },
    {
      title: 'Robotic Arm Diagram',
      prompt:
        'An educational infographic of an industrial robotic arm, showing its base, joints, actuators, and end effector with labeled segments and range-of-motion arcs. Clean isometric 3D render on a soft neutral background, cool metallic palette with bright accent labels. Modern, crisp, and approachable - suitable for a technology and engineering concept.',
    },
    {
      title: 'Brain Anatomy Cross-Section',
      prompt:
        'An educational cross-section illustration of the human brain, labeling the cerebrum, cerebellum, brainstem, and key lobes in a clean medical-infographic style. Soft 3D render with subtle pink and gray tissue tones, gentle lighting, and crisp annotations. Scientific yet approachable, suitable for a neuroscience or biology concept. Detailed and accurate. A clear legend and directional indicators help readers orient the slice, and a soft scale bar conveys anatomical proportion.',
    },
    {
      title: 'Gravity Orbital Mechanics',
      prompt:
        'A scientific visualization of gravity and orbital mechanics, showing a planet with a satellite tracing an elliptical orbit, labeled gravitational vectors and velocity arrows. Clean 3D render on a starry dark background, cool blue palette with warm planet glow. Crisp, modern, and educational - ideal for a physics concept reference.',
    },
    {
      title: 'Mobius Strip Topology',
      prompt:
        'An educational illustration of a Mobius strip and other topological surfaces, rendered in 3D with a continuous colored band tracing its single surface. Soft neutral background, cool palette with vivid band colors, labeled mathematical notes. Clean, elegant, modern infographic style - suitable for a mathematics concept reference. Subtle shadows convey depth and dimensionality, making the abstract mathematical surface tangible and visually engaging for learners.',
    },
    {
      title: 'Space Race Timeline',
      prompt:
        'An educational historical illustration of the Space Race, showing a stylized timeline with the Sputnik satellite, Vostok rocket, Apollo lunar module, and a moon landing scene. Cool space palette with warm rocket exhaust, painterly realistic style, labeled milestones. Inspiring, detailed, and informative - ideal for a history of science concept.',
    },
    {
      title: 'Data Center Infrastructure',
      prompt:
        'An educational infographic of a data center, showing server racks, cooling systems, power distribution, and network uplinks in a clean isometric 3D cutaway. Cool blue palette on a soft background, labeled components and airflow arrows. Modern, crisp tech illustration suitable for a computer science or infrastructure concept. Color-coded pathways distinguish power, cooling, and network flows, and crisp labels make the complex infrastructure easy to understand.',
    },
    {
      title: 'Forest Ecosystem Web',
      prompt:
        'An educational illustration of a forest ecosystem food web, showing producers, consumers, and decomposers connected by energy-flow arrows among trees, deer, wolves, and fungi. Warm earthy palette, painterly natural style with labeled organisms. Detailed, balanced composition - ideal for an ecology and biology concept reference. Soft directional lighting and labeled energy-transfer arrows clarify the flow of matter and energy through the woodland community.',
    },
    {
      title: 'Magnetic Field Earth',
      prompt:
        'A scientific visualization of Earth magnetic field, showing dipolar field lines arcing between the poles and deflecting solar wind, with auroras at the poles. Clean 3D render on a starry space background, cool blue palette with vivid green aurora accents. Crisp, modern, and educational - ideal for a physics or earth-science concept.',
    },
    {
      title: 'Calculus Derivative Concept',
      prompt:
        'An educational illustration of the calculus derivative concept, showing a smooth curve with a tangent line at a point, labeled slope, secant lines approaching the tangent, and notation. Clean minimal infographic style on a soft grid background, cool palette with bright accent lines. Crisp, modern, and approachable for a mathematics concept.',
    },
    {
      title: 'Silk Road Trade Map',
      prompt:
        'An educational historical map of the Silk Road trade routes, showing caravans, camels, and key cities connecting East and West, with traded goods illustrated along the paths. Warm sepia and jewel-tone palette, painterly cartographic style, labeled regions. Rich, detailed, and informative - ideal for a history concept reference. Decorative compass roses and inset illustrations of silk, spices, and porcelain enrich the composition and evoke centuries of cultural exchange.',
    },
    {
      title: 'Semiconductor Wafer Micro',
      prompt:
        'An educational microscopic visualization of a semiconductor wafer, showing etched circuits, transistors, and interconnects in a clean isometric 3D render. Cool blue and silver palette on a dark background, labeled layers and components, glowing trace accents. Modern, crisp tech illustration suitable for a materials science or electronics concept. A magnification indicator and a scale bar anchor the corner, contextualizing the microscopic scale of the intricate circuitry.',
    },
    {
      title: 'Water Cycle Diagram',
      prompt:
        'An educational illustration of the water cycle, showing evaporation from oceans, cloud formation, precipitation over mountains, and rivers returning to the sea, with labeled arrows. Soft painterly landscape style, cool blue and green palette with warm sun accents. Clean, approachable, and detailed - ideal for an earth-science concept. A simple legend defines evaporation, condensation, precipitation, and collection, guiding the reader step by step through the continuous cycle.',
    },
    {
      title: 'Thermodynamics Heat Flow',
      prompt:
        'A scientific visualization of thermodynamics, showing heat flow between hot and cold reservoirs, with labeled molecules, entropy arrows, and a heat engine in between. Clean 3D render on a soft gradient background, warm-to-cool palette gradient. Crisp, modern, and educational - suitable for a physics concept reference. Clear visual hierarchy. A concise energy-transfer equation anchors the corner, linking the vivid visual metaphor to the underlying laws of thermodynamics.',
    },
    {
      title: 'Probability Bell Curve',
      prompt:
        'An educational illustration of a probability bell curve (normal distribution), showing the curve with labeled standard deviations, mean, and shaded regions, alongside dice and coins as examples. Clean minimal infographic style on a soft background, cool palette with bright accent shading. Crisp, approachable, and modern - ideal for a statistics concept.',
    },
    {
      title: 'Renaissance Workshop Scene',
      prompt:
        'An educational historical scene of a Renaissance workshop, showing an artist, an engineer, and a scholar collaborating among sketches, astrolabes, and anatomical models. Warm golden palette, painterly realistic style with atmospheric light. Labeled key ideas in a subtle caption style. Rich, detailed - ideal for a history of ideas textbook spread.',
    },
    {
      title: 'Neural Network Architecture',
      prompt:
        'An educational infographic of an artificial neural network, showing input, hidden, and output layers of glowing nodes connected by weighted edges, with labeled data flow. Cool blue and violet palette on a dark background, soft glow, clean modern 3D render. Crisp, approachable, and elegant - ideal for an AI and machine-learning concept.',
    },
  ],
};

/**
 * Ordered list of supported category ids.
 * @type {readonly string[]}
 */
export const CATEGORIES = Object.freeze([
  'visual-assets',
  'game-assets',
  'industrial',
  'education',
]);

/**
 * Number of prompts generated per batch.
 * @type {number}
 */
export const BATCH_SIZE = 30;

/**
 * Resolve the active category for a given UTC hour.
 *
 *   00-05 -> visual-assets
 *   06-11 -> game-assets
 *   12-17 -> industrial
 *   18-23 -> education
 *
 * @param {number} hour - UTC hour in [0, 23].
 * @returns {string} A category id from CATEGORIES.
 */
function getCategoryForHour(hour) {
  const normalized = ((hour % 24) + 24) % 24;
  if (normalized <= 5) return 'visual-assets';
  if (normalized <= 11) return 'game-assets';
  if (normalized <= 17) return 'industrial';
  return 'education';
}

/**
 * Zero-pad a number to two digits.
 * @param {number} n
 * @returns {string}
 */
function pad2(n) {
  return String(n).padStart(2, '0');
}

/**
 * Generate 30 diverse image-generation prompts for the batch active at the
 * given date/time. The category is selected from the UTC hour of `date`.
 *
 * @param {Date} [date=new Date()] - Reference date used to pick the category.
 * @returns {Array<{prompt: string, filename: string, category: string, title: string}>}
 *   Exactly 30 prompt objects.
 */
export function generatePrompts(date = new Date()) {
  const category = getCategoryForHour(date.getUTCHours());
  const library = PROMPT_LIBRARY[category];

  if (!Array.isArray(library) || library.length < BATCH_SIZE) {
    throw new Error(
      `Prompt library for category "${category}" is incomplete: ` +
        `expected at least ${BATCH_SIZE} entries, found ${
          library ? library.length : 0
        }.`,
    );
  }

  return library.slice(0, BATCH_SIZE).map((entry, index) => {
    const number = pad2(index + 1);
    return {
      prompt: entry.prompt,
      filename: `image-${number}.png`,
      category,
      title: entry.title,
    };
  });
}

/**
 * Build metadata describing the batch active at the given date/time.
 *
 * Example:
 *   {
 *     batchId: "20260717-14",
 *     category: "industrial",
 *     timestamp: "2026-07-17T14:00:00.000Z",
 *     count: 30,
 *     description: "Industrial design product mockups and architectural visualizations"
 *   }
 *
 * `batchId` and `category` are derived from UTC components so that they stay
 * consistent with the `timestamp` (which is ISO-8601 UTC, floored to the hour).
 *
 * @param {Date} [date=new Date()] - Reference date used to pick the batch.
 * @returns {{batchId: string, category: string, timestamp: string, count: number, description: string}}
 */
export function getBatchMetadata(date = new Date()) {
  const hour = date.getUTCHours();
  const category = getCategoryForHour(hour);

  const yyyy = date.getUTCFullYear();
  const mm = pad2(date.getUTCMonth() + 1);
  const dd = pad2(date.getUTCDate());
  const hh = pad2(hour);

  const batchId = `${yyyy}${mm}${dd}-${hh}`;
  const timestamp = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, 0, 0, 0),
  ).toISOString();

  return {
    batchId,
    category,
    timestamp,
    count: BATCH_SIZE,
    description: CATEGORY_DESCRIPTIONS[category],
  };
}

export default { generatePrompts, getBatchMetadata, CATEGORIES, BATCH_SIZE };
