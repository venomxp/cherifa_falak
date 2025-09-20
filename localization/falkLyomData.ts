// This file contains pre-written interpretations for the "Falk Lyom" feature
// to eliminate API calls and avoid quota issues.

type Language = 'ar' | 'en' | 'fr';
type Category = 'love' | 'work' | 'luck';
type CardKey = 'sahiba_bayda' | 'hantiya' | 'samra' | 'fqih' | 'flouss' | 'bahr' | 'triq' | 'dar' | 'adou' | 'atba' | 'sid_rjal' | 'lalla_aicha';

type Interpretations = Record<Language, Record<CardKey, Record<Category, string[]>>>;

export const falkLyomInterpretations: Interpretations = {
  ar: {
    sahiba_bayda: {
      love: [
        "قلبك أبيض وصافي، واللي جاي فطريقك شخص نقي غادي يهنيك ويبغيك من قلبو. صبري، راه الخير قراب.",
        "البيضة كتوري طريق جديدة فالحب، فيها الفرحة والهنا. خلي نيتك زوينة وكلشي غايقاد.",
        "شي رسالة غاتفرحك من عند شخص بعيد. علاقتك بالشريك غاتزيد تقوى وتزيان."
      ],
      work: [
        "بداية جديدة فالخدمة، شي باب ديال الخير غايتحل ليك. ركزي مزيان والرزق جاي.",
        "ورقة بيضة هي علامة ديال النجاح، خدمتك غاتكون نقية وغادية مزيان. توكلي على الله.",
        "غتلاقي مع ناس جداد فالخدمة غايعاونوك. فرصة ديال ترقية أو خدمة حسن كاينة."
      ],
      luck: [
        "طريقك بيضة وزوينة، الحظ معاك والأمور غادية كيف بغيتي. تفاءلي بالخير تلقايه.",
        "عندك الزهر اليوم، أي حاجة حطيتي فيها يديك غاتصدق. استغلي هاد النهار.",
        "النية الصافية ديالك غاتجيب ليك الحظ. شي فلوس كنتي كتسنايهم غايوصلوك."
      ]
    },
    hantiya: {
      love: [
        "الحنطية هي الحنية والدفا. علاقتك بالشريك فيها استقرار وأمان، تهلاي فيها.",
        "شي شخص حنطي فايت فالطريق كيفكر فيك وغادي يقلب عليك. كوني مستعدة للمفاجآت.",
        "عنداك من سوء الفهم مع الشريك، حاولي تسمعي ليه وتفهميه. الصبر مفتاح الفرج."
      ],
      work: [
        "خدمتك مستقرة وغادية دقة دقة. ركزي على التفاصيل الصغيرة، هي اللي غادير الفرق.",
        "عندك شي زميلة فالخدمة حنطية غاتعاونك وتوقف معاك. الثقة مزيانة ولكن الحذر واجب.",
        "ممكن تحسي بشوية ديال الروتين، حاولي تبدلي شي حاجة فالطريقة باش كتخدمي."
      ],
      luck: [
        "الحظ معاك ولكن بالقياس. الأمور غادية مزيان ولكن بلا مغامرات كبيرة اليوم.",
        "رزقك غايجيك حتى لعندك بلا ما تقلبي عليه بزاف، غير خليك قنوعة.",
        "صحتك هي حظك اليوم، تهلاي فيها. شوية ديال الراحة غادير ليك الفرق."
      ]
    },
    samra: {
      love: [
        "السمرا هي الغموض والجاذبية. شي علاقة جديدة وقوية غاتبدأ قريب.",
        "كاين شوية ديال الغيرة والشك، حاولي تهدني الأمور ومتخليش الشيطان يدخل بيناتكم.",
        "شخص أسمر كيشوف فيك من بعيد ومعجب بيك. ممكن تكون بداية قصة زوينة."
      ],
      work: [
        "كاين تحديات فالخدمة، ولكن عندك القوة باش تغلبيهم. كوني قوية وماتخافيش.",
        "عنداك من الكلام ديال الناس، ركزي فخدمتك وماتسوقيش للهضرة الخاوية.",
        "شي فرصة ديال خدمة فيها السفر والتنقل غاتبان ليك. فكري فيها مزيان."
      ],
      luck: [
        "حظك اليوم فيه شوية ديال الصعوبات، ولكن فاللخر غاتكون نتيجة مزيانة. الصبر زين.",
        "ممكن تخسري شي حاجة بسيطة، ولكن غاتربحي شي حاجة كبر منها من بعد.",
        "حضي راسك من العين والحسد، ديري الوقاية ديالك والله المعين."
      ]
    },
    fqih: {
      love: [
        "الفقيه كيمثل الحكمة. خاصك تفكري بعقلك فالعلاقات ديالك ماشي غير بقلبك.",
        "شي نصيحة من شخص كبير وعاقل غاتنفعك فحياتك العاطفية. سمعي ليها.",
        "إذا كنتي فشي مشكل مع الشريك، الحوار الهادئ والعقلاني هو الحل الوحيد."
      ],
      work: [
        "خدمتك محتاجة تركيز وعقلانية. شي قرار مهم خاصك تاخديه، فكري مزيان قبل.",
        "غاتعلمي شي حاجة جديدة غاتنفعك فخدمتك. العلم نور.",
        "الأوراق والإجراءات الإدارية غادية مزيان، أي مشكل كان عندك غايتحل."
      ],
      luck: [
        "حظك فالحكمة والعلم. قراي شي كتاب ولا تعلمي شي مهارة جديدة اليوم.",
        "ماتغامريش بفلوسك اليوم، خليك محافظة على رزقك.",
        "دعوات الخير ديال والديك هي حظك الحقيقي، تهلاي فيهم."
      ]
    },
    flouss: {
      love: [
        "ممكن يكونوا مشاكل مع الشريك على قبل الماديات. حاولو تلقاو حل يرضيكم بجوج.",
        "شي هدية زوينة غاتوصلك من عند الشريك وغاتفرحك بزاف.",
        "الاستقرار المادي غايجيب ليكم الاستقرار العاطفي. خدمو عليه بجوج."
      ],
      work: [
        "الخدمة هي الفلوس. ركزي فخدمتك راه الرزق جاي فطريق.",
        "شي زيادة فالصالير أو شي بريم غايفرحك. مجهوداتك مغاداش تضيع.",
        "فرصة ديال شي مشروع صغير فيه الربح غاتبان ليك. درسيها مزيان."
      ],
      luck: [
        "عندك زهر كبير فالماديات اليوم. ممكن تربحي شي حاجة أو تلقاي فلوس.",
        "استثمري فلوسك فشي حاجة معقولة. الحظ معاك ولكن خاص العقل يكون حاضر.",
        "ماتسلفي ما تسلفي اليوم، خلي فلوسك عندك."
      ]
    },
    bahr: {
      love: [
        "البحر كيمثل المشاعر العميقة. علاقتك غادية وتتكبر وتعماق.",
        "كاين شوية ديال التقلبات فالمشاعر، مرة فرحانة مرة مقلقة. هادشي عادي، كلشي غايفوت.",
        "سفر قريب مع الشريك غايجدد ليكم العلاقة ويخليكم فرحانين."
      ],
      work: [
        "خدمتك فيها الحركة والتنقل. ممكن يكون شي سفر ديال الخدمة قريب.",
        "الأمور فالخدمة شوية مامستقراش، ولكن غاتلقاي الحلول للمشاكل اللي عندك.",
        "الأخبار غاتجي من بعيد وغاتكون فيها الخير ليك فالخدمة ديالك."
      ],
      luck: [
        "حظك اليوم فالسفر والتغيير. ماتبقايش فبلاصتك، تحركي.",
        "شربي الما مزيان اليوم، صحتك مرتبطة بالبحر.",
        "ماتخافيش من المجهول، راه البحر وخا كبير، فيه خيرات كثيرة."
      ]
    },
    triq: {
      love: [
        "طريق جديدة غاتفتح ليك فالحب. إذا كنتي بوحدك، شي علاقة جديدة غاتبان.",
        "إذا كنتي مرتبطة، علاقتك غاتدخل لمرحلة جديدة، ممكن تكون خطوبة أو زواج.",
        "شي صعوبات فبداية الطريق، ولكن بالنهاية غاتوصلي لداكشي اللي بغيتي."
      ],
      work: [
        "طريق النجاح مفتوحة قدامك، خاصك غير تزعمي وتمشي فيها.",
        "سفر ديال الخدمة فيه الخير والرزق. ماتردديش.",
        "ركزي على هدف واحد وماتشتتيش أفكارك، باش توصلي دغيا."
      ],
      luck: [
        "حظك فالحركة والتقدم. اليوم هو نهار باش تبداي شي حاجة جديدة.",
        "كل خطوة كديريها اليوم محسوبة ليك بالخير. زعمي.",
        "ماتشوفيش اللور، خليك غادية فطريقك والله المعين."
      ]
    },
    dar: {
      love: [
        "الدار هي الاستقرار. علاقتك بالشريك غاتعرف استقرار كبير وهدوء.",
        "فرحة غادخل لداركم، ممكن تكون مناسبة عائلية أو خبر زوين.",
        "حاولي تخلقي جو زوين فالدار مع شريك حياتك، راه السعادة فالحاجات البسيطة."
      ],
      work: [
        "خدمتك مستقرة وأمورك غادية مزيان. حافظي على هاد الاستقرار.",
        "ممكن تجيك فرصة ديال الخدمة من الدار، غاتكون مريحة وفيها الخير.",
        "العائلة غاتدعمك فقراراتك المهنية. تشاوري معاهم."
      ],
      luck: [
        "حظك اليوم فالراحة والهدوء فالدار. استمتعي بوقتك مع العائلة.",
        "الاستقرار هو أكبر حظ عندك اليوم. حمدي الله عليه.",
        "شي تغيير بسيط فالدار غايجيب ليك طاقة إيجابية وحظ زوين."
      ]
    },
    adou: {
      love: [
        "العدو ماشي بالضرورة شخص، ممكن يكونو أفكار سلبية. حاربي الشك والوسواس.",
        "كاين شي شخص قريب ليك كيحسدك على علاقتك. حضي راسك ومتعاوديش كلشي.",
        "المشاكل الصغيرة ممكن تكبر إذا معطيتيهاش أهمية. حلي مشاكلك دابا."
      ],
      work: [
        "كاين منافسة كبيرة فالخدمة، ولكن عندك القدرة باش تكوني الأحسن.",
        "عنداك من شي زميل فالخدمة كيبين ليك الزين وهو كيضرب من التحت. الثقة فالوثيقة.",
        "شي تحدي كبير غايجيك، ولكن إذا خدمتي بذكاء غاتغلبيه وغاتزيدي تباني."
      ],
      luck: [
        "حظك اليوم هو تكوني حذرة. ماتيقش دغيا وماتخديش قرارات بسرعة.",
        "تجنبي المشاكل والصداع اليوم. البعد عن الشر غنيمة.",
        "قوتي إيمانك بالله، هو اللي غايحميك من كل عدو."
      ]
    },
    atba: {
      love: [
        "عتبة جديدة فالحب غادخلي ليها، غاتكون أحسن من اللي فاتت.",
        "شي ضيف عزيز غايجي عندك وغايجيب معاه خبار الخير فالعاطفة.",
        "ماتردديش تبداي صفحة جديدة، العتبة رمز للتغيير الإيجابي."
      ],
      work: [
        "عتبة ديال خدمة جديدة أو مشروع جديد غاتفتح ليك. دخلي برجلك اليمنى.",
        "الأمور اللي كانت معكسة غادية تبدا تسهال وتتحل.",
        "الأخبار الزوينة على فم الباب، تسنايها بفارغ الصبر."
      ],
      luck: [
        "حظك فالبدايات الجديدة. أي حاجة بديتيها اليوم غاتكون ناجحة.",
        "العتبة هي الرزق اللي داخل، خلي بابك ديما محلول للخير.",
        "الفرص كتجي مرة فالعمر، إذا جات شي فرصة اليوم شدي فيها."
      ]
    },
    sid_rjal: {
      love: [
        "سيد الرجال كيمثل الشريك القوي والسند. شريكك واقف معاك وكيبغيك.",
        "إذا كنتي بوحدك، غاتلاقي مع رجل بمعنى الكلمة غايكون ليك السند فالحياة.",
        "الثقة والكلمة هي أساس العلاقة. كوني واضحة مع شريكك."
      ],
      work: [
        "غاتلقاي الدعم من عند مديرك فالخدمة أو شي شخص مهم.",
        "كلمتك غاتكون مسموعة والناس غاتيق فيك. استغلي هادشي فالخير.",
        "قرار مهم خاصك تاخديه، كوني قوية وقد المسؤولية."
      ],
      luck: [
        "حظك اليوم هو القوة والتحكم فالأمور. كلشي بين يديك.",
        "ساعدي الناس اللي محتاجين، الله غايوقف معاك.",
        "الكلمة الطيبة حظ، خلي كلامك ديما زوين."
      ]
    },
    lalla_aicha: {
      love: [
        "لالة عيشة هي الجاذبية والسحر. عندك واحد القبول خاص اليوم.",
        "علاقتك فيها شوية ديال الغموض، ولكن هادشي كيزيدها حلاوة.",
        "ماتخافيش من المشاعر القوية ديالك، عيشي الحب ديالك بكل جوارحك."
      ],
      work: [
        "عندك قدرة كبيرة على الإقناع، استعمليها باش تحققي أهدافك فالخدمة.",
        "شي حاجة كنتي مخبياها غاتبان وغاتكون لصالحك.",
        "خدمي بقلبك وبشغف، النجاح غايكون حليفك."
      ],
      luck: [
        "حظك فجاذبيتك الخاصة. اليوم الناس كلها غاتشوف فيك وغاتعجب بيك.",
        "تبعي الحدس ديالك، راه هو دليلك للخير.",
        "شي حلمة حلمتيها ممكن تكون فيها رسالة ليك. فكري فيها مزيان."
      ]
    }
  },
  en: {
    sahiba_bayda: {
      love: [
        "Your heart is pure, and someone with a good soul is coming your way to bring you peace and true love. Be patient, good things are near.",
        "This white card shows a new path in love, full of joy and serenity. Keep your intentions pure and everything will fall into place.",
        "A happy message is coming from someone far away. Your relationship with your partner will grow stronger and more beautiful."
      ],
      work: [
        "A new beginning at work is on the horizon; a door of opportunity will open for you. Focus, and prosperity will follow.",
        "A white paper is a sign of success. Your work will be clean and proceed smoothly. Trust in God.",
        "You'll meet new people at work who will help you. There's a chance for a promotion or a better job."
      ],
      luck: [
        "Your path is clear and beautiful. Luck is on your side, and things are going as you wish. Be optimistic, and you will find good fortune.",
        "You are lucky today; anything you touch will turn to gold. Seize the day.",
        "Your pure intentions will bring you luck. Some money you've been waiting for will arrive."
      ]
    },
    hantiya: {
      love: [
        "The wheatish woman represents tenderness and warmth. Your relationship with your partner is stable and secure; cherish it.",
        "A wheatish person from your past is thinking of you and will reach out. Be ready for surprises.",
        "Beware of misunderstandings with your partner. Try to listen and understand them. Patience is the key."
      ],
      work: [
        "Your work is stable and progressing steadily. Focus on the small details; they will make the difference.",
        "A wheatish colleague will help and support you. Trust is good, but caution is necessary.",
        "You might feel a bit of routine. Try to change something in the way you work."
      ],
      luck: [
        "Luck is with you, but in moderation. Things are going well, but avoid big risks today.",
        "Your provision will come to you without much searching, just be content.",
        "Your health is your luck today, take care of it. A little rest will make a difference."
      ]
    },
    samra: {
      love: [
        "The dark woman represents mystery and charm. A new and strong relationship will begin soon.",
        "There's a bit of jealousy and doubt. Try to calm things down and don't let negativity come between you.",
        "A dark-skinned person is watching you from afar and is attracted to you. It could be the start of a beautiful story."
      ],
      work: [
        "There are challenges at work, but you have the strength to overcome them. Be strong and unafraid.",
        "Beware of gossip. Focus on your work and ignore empty talk.",
        "A work opportunity involving travel will appear. Think about it carefully."
      ],
      luck: [
        "Your luck today has some difficulties, but in the end, the result will be good. Patience is a virtue.",
        "You might lose something small, but you'll gain something bigger later on.",
        "Protect yourself from the evil eye and envy. Take precautions, and God will help you."
      ]
    },
    fqih: {
      love: [
        "The scholar represents wisdom. You need to think with your mind in your relationships, not just your heart.",
        "Advice from an older, wise person will benefit your love life. Listen to it.",
        "If you're in trouble with your partner, calm and rational dialogue is the only solution."
      ],
      work: [
        "Your work requires focus and rationality. You have an important decision to make; think well before you act.",
        "You will learn something new that will benefit your career. Knowledge is light.",
        "Paperwork and administrative procedures are going well; any problem you had will be resolved."
      ],
      luck: [
        "Your luck is in wisdom and knowledge. Read a book or learn a new skill today.",
        "Don't gamble with your money today; be conservative with your resources.",
        "Your parents' blessings are your true luck; take care of them."
      ]
    },
    flouss: {
      love: [
        "There might be problems with your partner over financial matters. Try to find a solution that satisfies you both.",
        "A beautiful gift from your partner will arrive and make you very happy.",
        "Financial stability will bring you emotional stability. Work on it together."
      ],
      work: [
        "Work is money. Focus on your job, and prosperity is on its way.",
        "A salary increase or a bonus will make you happy. Your efforts will not be in vain.",
        "An opportunity for a small, profitable project will appear. Study it well."
      ],
      luck: [
        "You have great financial luck today. You might win something or find money.",
        "Invest your money wisely. Luck is with you, but you must use your head.",
        "Neither a borrower nor a lender be today; keep your money with you."
      ]
    },
    bahr: {
      love: [
        "The sea represents deep emotions. Your relationship is growing and deepening.",
        "There are some emotional fluctuations, sometimes happy, sometimes sad. This is normal; it will all pass.",
        "A trip with your partner soon will renew your relationship and bring you joy."
      ],
      work: [
        "Your work involves movement and travel. There might be a business trip soon.",
        "Things at work are a bit unstable, but you will find solutions to your problems.",
        "News will come from afar and will be good for your career."
      ],
      luck: [
        "Your luck today is in travel and change. Don't stay in one place; move.",
        "Drink plenty of water today; your health is linked to the sea.",
        "Don't be afraid of the unknown. Though the sea is vast, it holds many treasures."
      ]
    },
    triq: {
      love: [
        "A new road will open for you in love. If you are single, a new relationship will appear.",
        "If you are in a relationship, it will enter a new phase, possibly an engagement or marriage.",
        "There will be some difficulties at the beginning of the road, but in the end, you will get what you want."
      ],
      work: [
        "The road to success is open before you; you just need to be bold and walk it.",
        "A business trip holds promise for prosperity. Do not hesitate.",
        "Focus on one goal and don't scatter your thoughts, so you can reach it quickly."
      ],
      luck: [
        "Your luck is in movement and progress. Today is the day to start something new.",
        "Every step you take today is a step towards good fortune. Be brave.",
        "Don't look back; keep moving forward on your path, and God will be with you."
      ]
    },
    dar: {
      love: [
        "The house is stability. Your relationship with your partner will experience great stability and peace.",
        "Joy will enter your home, perhaps a family occasion or good news.",
        "Try to create a pleasant atmosphere at home with your partner; happiness is in the simple things."
      ],
      work: [
        "Your work is stable, and your affairs are going well. Maintain this stability.",
        "You might get a work-from-home opportunity; it will be comfortable and beneficial.",
        "Your family will support you in your professional decisions. Consult with them."
      ],
      luck: [
        "Your luck today is in rest and peace at home. Enjoy your time with family.",
        "Stability is your greatest luck today. Be grateful for it.",
        "A small change at home will bring you positive energy and good luck."
      ]
    },
    adou: {
      love: [
        "The enemy is not necessarily a person; it could be negative thoughts. Fight doubt and suspicion.",
        "Someone close to you is envious of your relationship. Be careful and don't share everything.",
        "Small problems can grow if you don't address them. Solve your problems now."
      ],
      work: [
        "There is great competition at work, but you have the ability to be the best.",
        "Beware of a colleague who pretends to be nice but works against you behind your back. Trust but verify.",
        "A big challenge will come your way, but if you work smartly, you will overcome it and shine."
      ],
      luck: [
        "Your luck today is to be cautious. Don't trust easily and don't make quick decisions.",
        "Avoid problems and arguments today. Discretion is the better part of valor.",
        "Strengthen your faith in God; He will protect you from all enemies."
      ]
    },
    atba: {
      love: [
        "You are about to cross a new threshold in love; it will be better than the last.",
        "A dear guest will visit you and bring good news about your love life.",
        "Don't hesitate to start a new chapter; the threshold is a symbol of positive change."
      ],
      work: [
        "The threshold of a new job or a new project will open for you. Enter with your right foot.",
        "Things that were blocked will start to ease and get resolved.",
        "Good news is at the door; wait for it eagerly."
      ],
      luck: [
        "Your luck is in new beginnings. Anything you start today will be successful.",
        "The threshold represents incoming fortune; always keep your door open for good things.",
        "Opportunities come once in a lifetime; if one comes today, seize it."
      ]
    },
    sid_rjal: {
      love: [
        "The master of men represents a strong and supportive partner. Your partner stands by you and loves you.",
        "If you are single, you will meet a true man who will be your support in life.",
        "Trust and keeping one's word are the foundation of a relationship. Be clear with your partner."
      ],
      work: [
        "You will find support from your boss or an important person at work.",
        "Your voice will be heard, and people will trust you. Use this for good.",
        "You have an important decision to make; be strong and responsible."
      ],
      luck: [
        "Your luck today is strength and control over matters. Everything is in your hands.",
        "Help people in need, and God will stand with you.",
        "A kind word is luck; let your words always be beautiful."
      ]
    },
    lalla_aicha: {
      love: [
        "Lalla Aicha is charm and magic. You have a special allure today.",
        "Your relationship has a bit of mystery, but this adds to its sweetness.",
        "Don't be afraid of your strong feelings; live your love with all your being."
      ],
      work: [
        "You have a great power of persuasion; use it to achieve your goals at work.",
        "Something you were hiding will be revealed and will be in your favor.",
        "Work with your heart and passion, and success will be your ally."
      ],
      luck: [
        "Your luck is in your special charm. Today, all eyes will be on you.",
        "Follow your intuition; it is your guide to what is good.",
        "A dream you had might hold a message for you. Think about it carefully."
      ]
    }
  },
  fr: {
    sahiba_bayda: {
      love: [
        "Ton cœur est pur, et une personne bienveillante est en route pour t'apporter paix et amour véritable. Sois patient, le bonheur est proche.",
        "Cette carte blanche montre un nouveau chemin en amour, rempli de joie et de sérénité. Garde tes intentions pures et tout s'arrangera.",
        "Un heureux message arrive de quelqu'un de loin. Ta relation avec ton partenaire se renforcera et s'épanouira."
      ],
      work: [
        "Un nouveau départ au travail se profile ; une porte d'opportunité s'ouvrira pour toi. Reste concentré, et la prospérité suivra.",
        "Un papier blanc est un signe de succès. Ton travail sera impeccable et se déroulera sans accroc. Fais confiance à Dieu.",
        "Tu rencontreras de nouvelles personnes au travail qui t'aideront. Une chance de promotion ou un meilleur emploi existe."
      ],
      luck: [
        "Ton chemin est clair et beau. La chance est de ton côté, et les choses se passent comme tu le souhaites. Sois optimiste, et tu trouveras la bonne fortune.",
        "Tu as de la chance aujourd'hui ; tout ce que tu touches se transformera en or. Profite de la journée.",
        "Tes intentions pures t'apporteront la chance. De l'argent que tu attendais arrivera."
      ]
    },
    hantiya: {
      love: [
        "La femme au teint de blé représente la tendresse et la chaleur. Ta relation avec ton partenaire est stable et sécurisante ; chéris-la.",
        "Une personne de ton passé au teint de blé pense à toi et te contactera. Sois prêt pour les surprises.",
        "Méfie-toi des malentendus avec ton partenaire. Essaie de l'écouter et de le comprendre. La patience est la clé."
      ],
      work: [
        "Ton travail est stable et progresse régulièrement. Concentre-toi sur les petits détails ; ils feront la différence.",
        "Une collègue au teint de blé t'aidera et te soutiendra. La confiance c'est bien, mais la prudence est de mise.",
        "Tu pourrais ressentir un peu de routine. Essaie de changer quelque chose dans ta façon de travailler."
      ],
      luck: [
        "La chance est avec toi, mais avec modération. Les choses vont bien, mais évite les grands risques aujourd'hui.",
        "Tes provisions viendront à toi sans que tu aies trop à chercher, sois simplement satisfait.",
        "Ta santé est ta chance aujourd'hui, prends-en soin. Un peu de repos fera toute la différence."
      ]
    },
    samra: {
      love: [
        "La femme brune représente le mystère et le charme. Une nouvelle et forte relation commencera bientôt.",
        "Il y a un peu de jalousie et de doute. Essaie de calmer les choses et ne laisse pas la négativité s'installer entre vous.",
        "Une personne à la peau mate t'observe de loin et est attirée par toi. Cela pourrait être le début d'une belle histoire."
      ],
      work: [
        "Il y a des défis au travail, mais tu as la force de les surmonter. Sois fort et n'aie pas peur.",
        "Méfie-toi des commérages. Concentre-toi sur ton travail et ignore les paroles en l'air.",
        "Une opportunité de travail impliquant des voyages se présentera. Réfléchis-y bien."
      ],
      luck: [
        "Ta chance aujourd'hui rencontre quelques difficultés, mais à la fin, le résultat sera bon. La patience est une vertu.",
        "Tu pourrais perdre quelque chose de petit, mais tu gagneras quelque chose de plus grand plus tard.",
        "Protège-toi du mauvais œil et de l'envie. Prends tes précautions, et Dieu t'aidera."
      ]
    },
    fqih: {
      love: [
        "L'érudit représente la sagesse. Tu dois penser avec ton esprit dans tes relations, pas seulement avec ton cœur.",
        "Les conseils d'une personne âgée et sage profiteront à ta vie amoureuse. Écoute-les.",
        "Si tu as des problèmes avec ton partenaire, un dialogue calme et rationnel est la seule solution."
      ],
      work: [
        "Ton travail exige de la concentration et de la rationalité. Tu as une décision importante à prendre ; réfléchis bien avant d'agir.",
        "Tu apprendras quelque chose de nouveau qui profitera à ta carrière. La connaissance est lumière.",
        "La paperasse et les procédures administratives se passent bien ; tout problème que tu avais sera résolu."
      ],
      luck: [
        "Ta chance réside dans la sagesse et la connaissance. Lis un livre ou apprends une nouvelle compétence aujourd'hui.",
        "Ne joue pas avec ton argent aujourd'hui ; sois conservateur avec tes ressources.",
        "Les bénédictions de tes parents sont ta vraie chance ; prends soin d'eux."
      ]
    },
    flouss: {
      love: [
        "Il pourrait y avoir des problèmes avec ton partenaire concernant les questions financières. Essayez de trouver une solution qui vous satisfasse tous les deux.",
        "Un beau cadeau de ton partenaire arrivera et te rendra très heureux.",
        "La stabilité financière vous apportera la stabilité émotionnelle. Travaillez-y ensemble."
      ],
      work: [
        "Le travail, c'est de l'argent. Concentre-toi sur ton travail, la prospérité est en chemin.",
        "Une augmentation de salaire ou une prime te rendra heureux. Tes efforts ne seront pas vains.",
        "L'opportunité d'un petit projet rentable se présentera. Étudie-la bien."
      ],
      luck: [
        "Tu as beaucoup de chance financièrement aujourd'hui. Tu pourrais gagner quelque chose ou trouver de l'argent.",
        "Investis ton argent judicieusement. La chance est avec toi, mais tu dois utiliser ta tête.",
        "Ne sois ni emprunteur ni prêteur aujourd'hui ; garde ton argent avec toi."
      ]
    },
    bahr: {
      love: [
        "La mer représente des émotions profondes. Ta relation grandit et s'approfondit.",
        "Il y a des fluctuations émotionnelles, parfois heureux, parfois triste. C'est normal ; tout passera.",
        "Un voyage prochain avec ton partenaire renouvellera votre relation et vous apportera de la joie."
      ],
      work: [
        "Ton travail implique du mouvement et des voyages. Il pourrait y avoir un voyage d'affaires bientôt.",
        "Les choses au travail sont un peu instables, mais tu trouveras des solutions à tes problèmes.",
        "Des nouvelles viendront de loin et seront bonnes pour ta carrière."
      ],
      luck: [
        "Ta chance aujourd'hui est dans le voyage et le changement. Ne reste pas au même endroit ; bouge.",
        "Bois beaucoup d'eau aujourd'hui ; ta santé est liée à la mer.",
        "N'aie pas peur de l'inconnu. Bien que la mer soit vaste, elle recèle de nombreux trésors."
      ]
    },
    triq: {
      love: [
        "Une nouvelle route s'ouvrira à toi en amour. Si tu es célibataire, une nouvelle relation apparaîtra.",
        "Si tu es en couple, ta relation entrera dans une nouvelle phase, peut-être des fiançailles ou un mariage.",
        "Il y aura quelques difficultés au début du chemin, mais à la fin, tu obtiendras ce que tu veux."
      ],
      work: [
        "La route du succès est ouverte devant toi ; il te suffit d'être audacieux et de la parcourir.",
        "Un voyage d'affaires promet la prospérité. N'hésite pas.",
        "Concentre-toi sur un seul objectif et ne disperse pas tes pensées, afin de l'atteindre rapidement."
      ],
      luck: [
        "Ta chance est dans le mouvement et le progrès. Aujourd'hui est le jour pour commencer quelque chose de nouveau.",
        "Chaque pas que tu fais aujourd'hui est un pas vers la bonne fortune. Sois courageux.",
        "Ne regarde pas en arrière ; continue d'avancer sur ton chemin, et Dieu sera avec toi."
      ]
    },
    dar: {
      love: [
        "La maison, c'est la stabilité. Ta relation avec ton partenaire connaîtra une grande stabilité et paix.",
        "La joie entrera dans ta maison, peut-être une occasion familiale ou une bonne nouvelle.",
        "Essaie de créer une atmosphère agréable à la maison avec ton partenaire ; le bonheur est dans les choses simples."
      ],
      work: [
        "Ton travail est stable, et tes affaires vont bien. Maintiens cette stabilité.",
        "Tu pourrais avoir une opportunité de travailler à domicile ; ce sera confortable et bénéfique.",
        "Ta famille te soutiendra dans tes décisions professionnelles. Consulte-les."
      ],
      luck: [
        "Ta chance aujourd'hui est dans le repos et la paix à la maison. Profite de ton temps en famille.",
        "La stabilité est ta plus grande chance aujourd'hui. Sois-en reconnaissant.",
        "Un petit changement à la maison t'apportera une énergie positive et de la chance."
      ]
    },
    adou: {
      love: [
        "L'ennemi n'est pas nécessairement une personne ; ce pourrait être des pensées négatives. Combats le doute et la suspicion.",
        "Quelqu'un de proche est envieux de ta relation. Fais attention et ne partage pas tout.",
        "Les petits problèmes peuvent grandir si tu ne les traites pas. Résous tes problèmes maintenant."
      ],
      work: [
        "Il y a une grande compétition au travail, mais tu as la capacité d'être le meilleur.",
        "Méfie-toi d'un collègue qui fait semblant d'être gentil mais travaille contre toi dans ton dos. La confiance n'exclut pas le contrôle.",
        "Un grand défi se présentera à toi, mais si tu travailles intelligemment, tu le surmonteras et tu brilleras."
      ],
      luck: [
        "Ta chance aujourd'hui est d'être prudent. Ne fais pas confiance facilement et ne prends pas de décisions rapides.",
        "Évite les problèmes et les disputes aujourd'hui. La discrétion est la meilleure partie de la bravoure.",
        "Renforce ta foi en Dieu ; Il te protégera de tous les ennemis."
      ]
    },
    atba: {
      love: [
        "Tu es sur le point de franchir un nouveau seuil en amour ; il sera meilleur que le précédent.",
        "Un invité cher te rendra visite et apportera de bonnes nouvelles concernant ta vie amoureuse.",
        "N'hésite pas à commencer un nouveau chapitre ; le seuil est un symbole de changement positif."
      ],
      work: [
        "Le seuil d'un nouvel emploi ou d'un nouveau projet s'ouvrira à toi. Entre du pied droit.",
        "Les choses qui étaient bloquées commenceront à se faciliter et à se résoudre.",
        "De bonnes nouvelles sont à la porte ; attends-les avec impatience."
      ],
      luck: [
        "Ta chance réside dans les nouveaux départs. Tout ce que tu commenceras aujourd'hui sera couronné de succès.",
        "Le seuil représente la fortune entrante ; garde toujours ta porte ouverte aux bonnes choses.",
        "Les opportunités ne se présentent qu'une fois dans la vie ; si une se présente aujourd'hui, saisis-la."
      ]
    },
    sid_rjal: {
      love: [
        "Le maître des hommes représente un partenaire fort et un soutien. Ton partenaire est à tes côtés et t'aime.",
        "Si tu es célibataire, tu rencontreras un véritable homme qui sera ton soutien dans la vie.",
        "La confiance et la parole donnée sont le fondement d'une relation. Sois clair avec ton partenaire."
      ],
      work: [
        "Tu trouveras du soutien de la part de ton patron ou d'une personne importante au travail.",
        "Ta voix sera entendue, et les gens te feront confiance. Utilise cela pour le bien.",
        "Tu as une décision importante à prendre ; sois fort et responsable."
      ],
      luck: [
        "Ta chance aujourd'hui est la force et le contrôle sur les choses. Tout est entre tes mains.",
        "Aide les gens dans le besoin, et Dieu sera avec toi.",
        "Une parole gentille est une chance ; que tes paroles soient toujours belles."
      ]
    },
    lalla_aicha: {
      love: [
        "Lalla Aicha est le charme et la magie. Tu as un attrait particulier aujourd'hui.",
        "Ta relation a un peu de mystère, mais cela ajoute à sa douceur.",
        "N'aie pas peur de tes sentiments forts ; vis ton amour de tout ton être."
      ],
      work: [
        "Tu as un grand pouvoir de persuasion ; utilise-le pour atteindre tes objectifs au travail.",
        "Quelque chose que tu cachais sera révélé et sera en ta faveur.",
        "Travaille avec ton cœur et ta passion, et le succès sera ton allié."
      ],
      luck: [
        "Ta chance réside dans ton charme spécial. Aujourd'hui, tous les yeux seront rivés sur toi.",
        "Suis ton intuition ; c'est ton guide vers ce qui est bon.",
        "Un rêve que tu as fait pourrait contenir un message pour toi. Réfléchis-y bien."
      ]
    }
  }
};
