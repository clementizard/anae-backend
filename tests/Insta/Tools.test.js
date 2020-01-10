/* eslint-disable max-len */
import test from 'ava';
import {
	formatAccount,
	formatPosts,
	formatAccountSnapshot,
	getNewValues,
	hasNewValues,
} from '../../src/InstaAnalytics/Tools';
import InstaData from './Test';

const removeElem = (data, elem) => {
	const { [elem]: removedElem, ...finalData } = data;
	return finalData;
};

test('Format account from data', (t) => {
	const formattedData = removeElem(formatAccount(InstaData), 'lastUpdate');

	t.deepEqual(formattedData, {
		description: 'Créateurs de bijoux en pierres semi précieuses, acier inoxydable et matières naturelles. Fabrication bordelaise 🇨🇵',
		email: '',
		fullName: 'Anae',
		url: 'https://instagram.com/anae.me',
		userId: '18152544090',
		username: 'anae.me',
		website: 'https://www.etsy.com/fr/shop/AnaeBoutique',
	});
});

test('Format account snapshot from data', (t) => {
	const formattedData = removeElem(formatAccountSnapshot(InstaData, 42), 'date');

	t.deepEqual(formattedData, {
		accountId: 42,
		comments: 30,
		engagement: 0.23200458847146543,
		followers: 317,
		following: 691,
		frequency: 2523,
		likes: 779,
		posts: 11,
	});
});

test('Format account posts from data', (t) => {
	const formattedData = formatPosts(InstaData, 42);
	for (let i = 0; i < formattedData.length; ++i) {
		formattedData[i] = removeElem(formattedData[i], 'lastUpdate');
		formattedData[i].snapshots[0] = removeElem(formattedData[i].snapshots[0], 'date');
	}

	t.deepEqual(formattedData, [{
		accountId: 42, postId: '2151705006787677526', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/c52027b3352310e37f974bfb7c1e5f24/5E2CA9C5/t51.2885-15/fr/e15/s1080x1080/70974913_392406831679869_6926352927224304578_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=109', text: 'La couleur rouge! 🍎 🍒\n\nÉnergisant et dynamisant, le rouge est associé au sang, au feu, à la passion, à la tentation 🔥\n\nSymbole de vie et de mort à la fois, il représente le courage, la force, la puissance et même la virilité selon les époques. Son rayonnement particulier lui procure des effets stimulants voire excitants si utilisés de manière excessive 🙈\n\nIl peut avoir des caractéristiques moins positives comme la colère, l’interdit, le danger, la domination ou la violence. C’est une couleur synonyme d’action et d’éclat, de désir et de sensualité, la couleur rouge ne passe pas inaperçue 😉\n\nLe rouge est associé au premier chakra, le chakra racine, situé à la base de notre colonne vertébrale. Associé au bien-être, à l’enracinement et à la survie; le rouge a pour propriété de stimuler la faim et aurait des vertus contre la timidité ou les anémies.\nIl s’impose comme une couleur pénétrante, chaleureuse, enveloppante et rassurante; à utiliser avec parcimonie 🚨\n\nBonne soirée a tous! 😘 •\n•\n•\n•\n•\n', hashtags: ['#healingcrystals', '#healingstones', '#crystalhealing', '#quartz', '#crystallove', '#rockhound', '#crystal', '#minerals', '#crystals', '#amethyst', '#red', '#orange', '#metaphysical', '#chakra', '#crystaljewelry', '#altar', '#gemstones', '#newage', '#reiki', '#yellow', '#rosequartz', '#quartzcrystal', '#chakras', '#gemstone', '#white', '#agate', '#lithotherapie', '#lithothérapie', '#cristaux', '#createurs'], snapshots: [{ comments: 3, likes: 51 }],
	}, {
		accountId: 42, postId: '2150957340626129243', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/88d570732a74be83945f236e323b9de0/5E1EED8E/t51.2885-15/e35/71089944_2473209716336949_2761268170779971692_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=109', text: "Bracelet \"Force tranquille\" 💪\n\nBracelet composé d'aventurine jaune, de cornaline, de bois et d'un pendentif géométrique en acier inoxydable doré. Perles de 8mm .\n\nEn lithothérapie, l'aventurine favorise la joie et la gaieté. Redonnant de l'enthousiasme, la confiance, elle a des vertus anti-stress. Son énergie douce et tonique confère de la bonne humeur à son porteur 😁\nCette pierre est conseillée aux femmes recherchant à avoir un enfant car elle permets d'augmenter la fécondité. Aussi, elle apaise les émotions et favorise la relaxation 🙏\n\nLa cornaline stimule la concentration, la méditation et renforce la mémoire 🧠 C'est une pierre énergisante et vitalisante. Très utile pour les personnes timides, elle donne confiance en soi en éloignant les peurs. Elle favorise la fertilité et apporte force et courage. Elle apaise les colères et jalousies 👀\n\nVous pouvez retrouver ce bracelet ainsi que nos autres créations sur notre Etsy, lien en bio 😉", hashtags: [], snapshots: [{ comments: 1, likes: 53 }],
	}, {
		accountId: 42, postId: '2149601272423767952', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/c8584304d3ceacd2ebaadadf22d5c907/5E2D4CCC/t51.2885-15/e35/70716918_446652955954036_6336696211105304731_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=104', text: "L'automne est là, tel un artiste la nature nous offre ses plus belles couleurs 🍂 Voici notre sélection de pierres choisies pour nos créations de saison🍁\nVous trouverez dans l'ordre l’œil de tigre, la Cornaline, le Grenat rouge, le Péridot, l'Unakite ainsi qu'une description de leurs vertus.\n\nL'œil de tigre est une pierre de protection contre les mauvaises énergies🛡️ Il permets de retourner celles-ci vers leur émetteur. Ainsi, il aide à atténuer la peur et le stress et améliore la confiance en soi. Il favorise la création et renforce le métabolisme. Cette pierre peut-être utilisée lors d'examens importants ou le changement de situations personnelles ou professionnelles.\n\nLa cornaline stimule la concentration, la méditation et renforce la mémoire🧠 C'est une pierre énergisante et vitalisante. Très utile pour les personnes timides, elle donne confiance en soi en éloignant les peurs. Elle favorise la fertilité et apporte force et courage. Elle apaise les colères et jalousies👀\n\nLe grenat rouge est une pierre énergisante apportant force, courage et confiance en soi. Elle aide à lutter contre les mauvaises pensées du quotidien ainsi que la fatigue. Aidant à surmonter les obstacles, c'est une pierre idéale pour les sportifs 💪 De plus, cette pierre aurait des vertus de régénération d’énergie sexuelle 💋\n\nLe Péridot favorise la réalisation des rêves. Il a une action équilibrante sur les émotions, atténue les maux de cœurs et consolide la confiance en soi✌️ Éloignant les idées noires il apporte amour à son porteur tout en réduisant son stress. Favorisant la clarté et le bien être, il aide a la prise de décisions♟️ L'Unakite possède de nombreuses vertus. Elle permets de prendre du recul sur les situations, et ainsi de relativiser. C'est une pierre régénératrice pour l'organisme, elle est souvent utilisée lors de convalescence de maladies ou les femmes qui sont/veulent être enceintes. Elle apporte sagesse et sérénité🙏\n\nEn espérant que ceci aura pu vous éclairer en vous apportant plus de connaissances sur les différentes gemmes que nous utiliserons pour confectionner nos créations d'automne🍁\n\nA bientôt!😉", hashtags: [], snapshots: [{ comments: 5, likes: 72 }],
	}, {
		accountId: 42, postId: '2148922454771842742', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/44fba3cd6af8ab45eea1e2b07eba951f/5E17590C/t51.2885-15/e35/69183487_446369942443997_3904671069223491397_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=105', text: "Porte clés attrape-rêves (Améthyste) 🗝️\nPorte clés en acier inoxydable avec perle en améthyste.\nLongueur 5,8 cm. Diamètre 2,5 cm\n\nEn lithothérapie, l'améthyste apaise les angoisses et les colères, aide à retrouver la sérénité, stimule l'imagination et la créativité 🎨\n\nDans la culture amérindienne, les attrape rêves empêchent les cauchemars d'envahir les rêves de celui qui le porte. Cet objet d'inspiration chamanique apaisera vos nuits. 💤\n\nEn espérant que la nuit vous porte conseil 🌃", hashtags: [], snapshots: [{ comments: 1, likes: 52 }],
	}, {
		accountId: 42, postId: '2148150750776811729', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/46b4210abbdd04d007735bd0a63db0b6/5E32EA79/t51.2885-15/e35/71692355_2495127320523376_6263395542708671773_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=104', text: "Boucles d'oreilles \"Tigre boisé\" 🐅\n\nBoucles d'oreille en acier inoxydable couleur or, perles en bois et œil de tigre de 8mm. Pendant lotus en acier inoxydable doré✨\n\nEn lithothérapie, l'œil de tigre est une pierre de protection contre les mauvaises énergies. Il permets de retourner celles-ci vers leur émetteur. Ainsi, il aide à atténuer la peur et le stress et améliore la confiance en soi 😎\n\nPS: La livraison est gratuite pour cet article 😉", hashtags: [], snapshots: [{ comments: 2, likes: 80 }],
	}, {
		accountId: 42, postId: '2145246315566081365', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/99825fc7c8691c284ddc9cb76ac54581/5E3E1F1B/t51.2885-15/e35/70364035_2461539210622333_7042833387969621215_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=101', text: "L'Agate!\n\nPierre de la famille des quartz, elle se décline en différentes couleurs. Du vert au rouge en passant par le bleu, cette pierre possède de nombreuses vertus en lithothérapie.\n\nPrincipalement c'est une pierre de chance 🍀\nElle est également apaisante et calme les angoisses 😰\nParce qu'elle permets d'harmoniser les émotions, elle est souvent utilisée en méditation 🙏", hashtags: [], snapshots: [{ comments: 7, likes: 76 }],
	}, {
		accountId: 42, postId: '2144526074523513539', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/9e14d4e032ad081ff41b9436e5612a8b/5E3B76CE/t51.2885-15/e35/69711156_2115814195380157_7160683234579959759_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=101', text: "Bracelet \"Compassion\" 🦋\n\nBracelet composé de lave noire, d'Amazonite et de Jaspe Aqua Terra. Perles de 8mm, sauf Amazonite (10mm)\n\nL'Amazonite à pour vertu de protéger contre les ondes électromagnétiques (téléphone, ordinateurs...) Elle aide à la détente, apporte la joie de vivre, calme les troubles émotionnels et spirituels ✨\n\nLe Jaspe Aqua Terra permets de retrouver paix et compassion. Elle est énergisante et diminue l’état de stress et d’anxiété tout en favorisant un bon état d'esprit 🙏\n\nVous pouvez retrouver ce bracelet ainsi que nos autres articles sur notre Etsy, lien en bio 😉", hashtags: [], snapshots: [{ comments: 1, likes: 79 }],
	}, {
		accountId: 42, postId: '2143740767989556237', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/0c908ffa4a3ec5ede433101e469dcd12/5E30ECF8/t51.2885-15/e35/71780842_2454343071451835_8339696211192564083_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=111', text: "Bracelet \"Confiance\" 🙏\n\nBracelet en lave noire, bois, cristal de roche, œil de tigre et grenat rouge. Pierres de 8mm.\n\nLe grenat rouge est une pierre énergisante apportant force, courage et confiance en soi. Elle aide à lutter contre les mauvaises pensees du quotidien ainsi que la fatigue 💪\n\nL'œil de tigre est une pierre de protection contre les mauvaises énergies. Il permets de retourner celles-ci vers leur émetteur. Ainsi, il aide à attenuer la peur et le stress et améliore la confiance en soi 🐅\n\nLe cristal de roche est une pierre énergisante, de guérison qui permets de rééquilibrer le corps et l'esprit. Il est capable d'amplifier les vibrations des autres pierres🕊️", hashtags: [], snapshots: [{ comments: 5, likes: 86 }],
	}, {
		accountId: 42, postId: '2142807701167126510', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/7d9fe82afaa6ce156937850de540f94f/5E173597/t51.2885-15/e35/69456088_132865234743497_1534567798241621405_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=105', text: 'Nous vous souhaitons un excellent week-end à tous 🤗', hashtags: [], snapshots: [{ comments: 1, likes: 76 }],
	}, {
		accountId: 42, postId: '2138015621496489025', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/aecb223660c3810b1b7f376228ee6f08/5E3134B3/t51.2885-15/e35/69381661_513043849262004_1417033205351234239_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=100', text: "Voici notre première création 😉 \"Harmonie\" Bracelet 18cm en cristal de roche, améthyste et quartz rose.\nPendeloque en acier inoxydable.\n\nEn lithothérapie, l'améthyste apaise les angoisses et les colères, aide à retrouver la serenite, stimule l'imagination et la créativité 🎨\n\nLe quartz rose favorise la confiance en soi et apaise le stress. Il apporte paix, amour et tendresse 💜\n\nLe cristal de roche est une pierre énergisante, de guérison qui permets de réequilibrer le corps et l'esprit. Il est capable d'amplifier les vibrations des autres pierres 🌺\n.\n.\n.\n", hashtags: ['#cristaux', '#quartz', '#gemme', '#acierinoxydable', '#amethyste', '#zen', '#cristal', '#quartzrose', '#amour', '#spiritualité', '#pierreprecieuse', '#pierresnaturelles', '#harmonie', '#anae', '#calme', '#équilibre', '#energiepositive', '#féminité', '#sérénité', '#energiepositive', '#esprit', '#paix', '#creativite', '#violet', '#rose', '#bracelet', '#healthy', '#fleur', '#lithothérapie', '#lithotherapie'], snapshots: [{ comments: 3, likes: 104 }],
	}, {
		accountId: 42, postId: '2137731833092688568', postType: 'image', media: 'https://scontent-cdg2-1.cdninstagram.com/vp/3c6f6b4dbc5ee042e3d87df6bdd5e744/5E276C0F/t51.2885-15/e35/69935368_192823385060230_6868427530989292749_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=110', text: 'Nos créations seront bientôt en ligne, tenez vous prêts 👀\n.\n.\n.\n.\n.\n', hashtags: ['#cristaux', '#quartz', '#gemme', '#lithotherapie', '#lithothérapie', '#cristal', '#bijoux', '#bracelet', '#bouclesdoreilles', '#collier', '#acierinoxydable', '#zen', '#pierresnaturelles', '#meditation', '#calme', '#lotus', '#bienetre', '#amethyste', '#mineral', '#creation', '#violet', '#developpementpersonnel', '#energiepositive', '#chakra', '#spiritualité', '#pierreprecieuse', '#nature', '#beaute', '#creationfrancaise', '#anae'], snapshots: [{ comments: 1, likes: 50 }],
	}]);
});

test('Get new values', (t) => {
	const prevValue = {
		a: 1,
		b: {
			a: 2,
			b: 2,
		},
		c: '42',
	};
	const nextValue = {
		a: 3,
		b: {
			a: 2,
			b: 3,
		},
		c: '24',
	};

	t.deepEqual(getNewValues(prevValue, nextValue, ['c']), {
		a: 3,
		b: {
			a: 2,
			b: 3,
		},
	});
});

test('Has new values', (t) => {
	const prevValue = {
		a: 1,
		b: {
			a: 2,
			b: 2,
		},
		c: '42',
	};
	const nextValue = {
		a: 3,
		b: {
			a: 2,
			b: 3,
		},
		c: '24',
	};

	t.is(hasNewValues(prevValue, nextValue, ['c']), true);
});
