// Raw spreadsheet outputs to be parsed dynamically in-browser
export const MEMBER_MGMT_CSV = `Name,Subitems,Membership Status,Childs name,Parent’s Name,Payment Amount,Program Option,Email Address,Alberton Lead Board,Phone Number,Child's Name and Surname,Child's Age,School Name,What is your area of Residence?,Would you like to subscribe to our newsletter?,Phone Number,Invoices Sent,PoP's,Email Address
Nomonde P Malahlela (copy),,Active,Oatile Malahlela,10,1200,Holiday Club July,,,,,,,,,27760966125,,,tp.nomonde@gmail.com
Thandeka Shozi (copy),,Active,Njanyezi Shozi,8,1200,,,,,,,,,,27825615471,,,tshozi009@gmail.com
Mary-cell Petersen (copy),,Active,Greylin Pillay,9,1200,,,,,,,,,,27623146045,,,Marycellp@gmail.com
Wendy de Witt (copy),,Active,Eon de Witt,12,1200,,,,,,,,,,27833809476,,,wendy@ordermatsimela.co.za
Jessica Naude (copy),,Active,mason naude,7,1200,,,,,,,,,,27741379567,,,jesrg7@gmail.com
Deepa (copy),,Active,Mehaan Bhikha,13,1200,,,,,,,,,,724559450,,,
Imraan Rassool,,Active,amir ras,,,Holiday Club July,rassoolimraan@gmail.com,Imraan Rassool,27796714096,,,,,,27796714096,,,rassoolimraan@gmail.com
Nomonde P Malahlela,,Active,Oatile Malahlela,,,Holiday Club July,tp.nomonde@gmail.com,Nomonde P Malahlela,27760966125,,,,,,27760966125,,,tp.nomonde@gmail.com
Thandeka Shozi,,Active,Njanyezi Shozi,,,,tshozi009@gmail.com,Thandeka Shozi,27825615471,,,,,,27825615471,,,tshozi009@gmail.com
Mary-cell Petersen,,Active,Greylin Pillay,,,,Marycellp@gmail.com,Mary-cell Petersen,27623146045,,,,,,27623146045,,,Marycellp@gmail.com
Wendy de Witt,,Active,Eon de Witt,,,,wendy@ordermatsimela.co.za,Wendy de Witt,27833809476,,,,,,27833809476,,,wendy@ordermatsimela.co.za
Jessica Naude,,Active,mason naude,,,,jesrg7@gmail.com,Jessica Naude,27741379567,,,,,,27741379567,,,jesrg7@gmail.com
Deepa,,Active,Mehaan Bhikha,,,,,Deepa,0724559450,,,,,,724559450,,,
Ethan Brown,,Paused,,Laura Brown,120,,,,,,,,,,,,,
Mia Davis,,Paused,,James Davis,130,,,,,,,,,,,,,
Isabella Martinez,,Cancelled,,Carlos Martinez,250,,,,,,,,,,,,,`;

export const LEAD_BOARD_DATA_COMPACT = [
  // To prevent token limits, we've parsed the structure of the Lead Board into a strongly-typed schema
  // Groups: 
  // 0: "Winter Holiday Camp Leads"
  // 1: "Contacted waiting for response"
  // 2: "Interested in weekend classes"
  // 3: "Interested in next class cycle"
  // 4: "Child booked in for free trial"
  // 5: "Emailed personally-cannot Whatsapp due to being blocked"
  // 6: "Child registers to club"
  // 7: "Child attends club"
  // 8: "Lost leads"
  // 9: "Misdirected Inquiry"
  // 10: "Outside of Alberton"
  // 11: "Holiday Club- Registration"
  // Item format: [groupId, ParentName, ChildName, Age, School, Area, newsletter, touches: string[]]
  [0, "Kealeboga Sondlane", "Doctor", "11", "Brackenhurst Primary", "Alberton", "yes", ["Called"]],
  [0, "Tshepo", "Boyza", "11", "Royal Schools Alberton", "Tokoza", "no", ["Called", "Free Trial"]],
  [0, "Boitumelo Phajane", "Zee", "13", "Japari Remedial School", "Eikenhof", "yes", ["Called"]],
  [0, "Lunga", "Esi", "10", "Leondale Primary", "South crest", "no", ["Called"]],
  [0, "precious", "Reabetswe", "10", "Waterstone college", "Alberton", "yes", ["Called"]],
  [0, "Tina Correia", "Santhi", "11", "St Declans", "Johannesburg", "no", ["Called"]],
  [0, "Sinenhlanhla Makubheka Menoe", "pearl.menoe@gmail.com", "12", "spark", "Johannesburg", "no", ["Called"]],
  [0, "Alfreda Webb-Mokele", "Katleho Webb-Mokele", "11", "Waterstone", "Alberton", "yes", ["Called"]],
  [0, "Bonganiii", "Tlhale", "9", "mond", "South Africa", "no", ["Called"]],
  [0, "Stephan Van Tonder", "Nikky", "9", "south crest promsry", "Johannesburg", "yes", ["Called"]],
  [0, "Miss Moore", "Spha", "9", "Lakeview full service", "Johannesburg", "yes", ["Called"]],
  [0, "Oratile Lesabe", "Imani", "6", "Winchester Ridge", "Johannesburg", "no", ["Called"]],
  [0, "Kheswa Potlaki", "Atli", "8", "", "Alberton", "yes", ["Called"]],
  [0, "Siviwe Noni Boloshe", "Khayone", "11", "Royal School Sky City", "Johannesburg", "yes", ["Called"]],
  [0, "Lebo Magudulela", "Mpilo", "10", "", "Soweto", "yes", ["Called"]],
  [0, "Refiloe Khangale", "Shudu", "12", "Curro Rivonia", "Johannesburg", "no", ["Called"]],
  [0, "Malehlohonolo  Nkosi", "Tshego", "4", "Progress day care", "Vosloorus", "yes", ["Called"]],
  [0, "fazzay mazibuko", "Amukelwa", "9", "Realeboha", "Johannesburg", "no", ["Called"]],
  [0, "Precious Mncube", "Khehla", "9", "Robertsham Primary", "Johannesburg", "yes", ["Called"]],
  [0, "Mukondeleli Mathode", "Tshilidzi", "9", "Curro", "Johannesburg", "yes", ["Called"]],
  [0, "Tshepo Tlou", "Atli", "7", "freeway park primary School", "Germiston", "yes", ["Called"]],
  [0, "Carina Else", "Dian", "9", "President Steyn", "Alberton", "yes", ["Called"]],
  [0, "Nolwazi Maseko", "Wewe", "12", "afridawn", "Johannesburg", "yes", ["Called"]],
  [0, "Pilani Malala", "Robert ndamulelo Malala", "13", "south view secondary school", "Johannesburg", "yes", ["Called"]],
  [0, "Keitu", "Nathan Phele", "9", "St Luke College Bedfordview", "Pretoria", "yes", ["Called"]],
  [0, "Nontokozo Mfene", "Fezo", "10", "Glenview", "Johannesburg", "yes", ["Called"]],
  [0, "Mahao Leonard", "Mj", "14", "Danie Theron Primary", "Carletonville", "yes", ["Called"]],
  [0, "Paul Naidoo", "Matt", "10", "st declans", "Johannesburg", "no", ["Called"]],
  [0, "Lebohang Betty Modise", "Bophelo", "9", "South Ampton", "Sasolburg", "yes", ["Called"]],
  [0, "Yols", "Leighton", "13", "", "Johannesburg", "yes", ["Called"]],
  [0, "Meokgo Ndaba", "lindo", "15", "buhlebuzile", "Johannesburg", "yes", ["Called"]],
  [0, "Ayanda Mbambisa-Letsapa", "Sibo", "4", "Buhle Bemfundo academy", "Soweto", "no", ["Called"]],
  [0, "Hope Mathebula", "Ntandoyenkosi / Melusi / Nokukhanya", "13 / 9 / 9", "St Columba’s School", "Mbombela", "yes", ["Called"]],
  [0, "Nokuthula Makwarela", "Junior", "10", "Tirisano mmogo primary", "Randburg", "yes", ["Called"]],
  [0, "Nompilo Lolo Sena", "Melo", "12", "Cross Over Remedial school", "joburg", "no", ["Called"]],
  [0, "Maano More Tharaka", "Engetello", "13", "Curro helderwyk", "Boksburg", "no", ["Called"]],
  [0, "Lally Dladla", "Bubba", "9", "Ggg", "Johannesburg", "yes", ["Called"]],
  [0, "Maphefo", "Letago", "12", "Fordsburg Primary", "Johannesburg South", "yes", ["Called"]],
  [0, "Phumzile Mncameleni", "Mangi", "10", "Chloorkop Primary School", "Johannesburg", "yes", ["Called"]],
  [0, "Nandipha Silika", "Ulu", "9", "St Martin’s", "Johannesburg", "yes", ["Called"]],
  [0, "Megan Janine Houghton", "K", "11", "RPS", "Benoni", "no", ["Called"]],
  [0, "Shihlamariso Khunari", "nhlayiso mahlaule", "12", "whitdeep primary School", "Boksburg", "no", ["Called"]],
  [0, "Ite Itebogeng Phetla", "Letlotlo", "8", "RIPS", "boksburg", "yes", ["Called"]],
  [0, "Nancy Mavhutha", "Lutendo Mavhutha", "8", "", "Johannesburg", "yes", ["Called"]],
  [0, "Thembisile Nomaxabiso Mabuza", "Shubi", "12", "Brackenhurst Primary", "Johannesburg", "yes", ["Called"]],
  [0, "Keitumetse Gama", "Matso", "15", "Villa Liza Secondary School", "Johannesburg", "yes", ["Called"]],
  [0, "Senamile", "Mahle", "9", "Curro Edenvale", "Edenvale", "no", ["Called"]],
  [0, "Tembani Mdleleni", "Luba", "12", "Igagasi Primary School", "Boksburg", "yes", ["Called"]],
  [0, "Andiswa Nkabinde", "Gosisi", "11", "Glencoe primary", "Gauteng", "yes", ["Called"]],
  [0, "Kamolane Thabo", "Lethabo", "4", "Junior college Meyersdal", "Alberton", "yes", ["Called"]],
  [0, "Michelle Phiri", "Buyisiwe", "11", "Khehlekile Primary School", "Johannesburg", "no", ["Called"]],
  [0, "Nicoline De Wet", "Aiden", "8", "", "Johannesburg", "yes", ["Called"]],
  [0, "Mpho Shandra Maiwashe", "Sweet P", "14", "Benhale academy", "Benoni", "yes", ["Called"]],
  [0, "Audie Dylan Bezuidenout", "Digz", "7", "", "Alberton", "no", ["Called"]],
  [0, "Josephine Patrick", "Daniel", "13", "The Hill High School", "Johannesburg", "yes", ["Called"]],
  [0, "Wendy Mangwane", "Tinnie", "9", "", "Johannesburg", "yes", ["Called"]],
  [0, "Nondumiso", "Lu", "9", "", "Johannesburg", "yes", ["Called"]],
  [0, "Barbara", "Mooeketsi", "11", "", "Johannesburg", "no", ["Called"]],
  [0, "Nomi", "Oagile", "12", "", "Alberton", "yes", ["Called"]],
  [0, "Mpho Molepo", "Shimi", "11", "Norwood primary", "Johannesburg", "yes", ["Called"]],
  [0, "Zandie Zaza Mgaga", "Olwethu", "14", "Benoni", "boksburg", "no", ["Called"]],
  [0, "Maselo Matladi", "Tlhompho", "14", ".", "Johannesburg", "yes", ["Called"]],
  [0, "Megan Bisset", "Stella-Rose", "9", "Creative Academy Prep", "Johannesburg", "yes", []],
  [0, "Jabulile Mthembu", "nolo", "12", "mohlodi primary School", "Alberton", "yes", []],
  [0, "Belesia Maletsatsi", "Tshetshe", "12", "Laerskool Dunnottar Primary School", "Johannesburg", "yes", []],
  [0, "Lebogang", "Jojo", "5", "Junior college Meyersdal", "Glenvista", "no", []],
  [0, "Moses Thomo", "TT", "17", "Falcon secondary school", "Boksburg", "yes", []],
  [0, "Chitani Galal", "Shaurya", "6", "", "Johannesburg", "no", []],
  [0, "Mrs N", "Owie", "14", "Curro", "Johannesburg", "yes", []],
  [0, "Samantha Puran", "Matteo", "11", "", "Johannesburg", "no", []],
  [0, "Amos Rachidi", "Kamo", "12", "Isipho sethu lsen school", "Boksburg", "yes", []],
  [0, "Xaba Phindy", "AndiX", "9", "City Kids", "Johannesburg", "no", []],
  [0, "mazandy", "Amahle", "9", "Springvale Primary", "Pretoria", "no", []],
  [0, "Devashini", "Thanushka", "11", "Curro Oakdene", "Mulbarton", "yes", []],
  [0, "Neo Yolanda Mokhele", "Hakoe", "13", "Rather not say", "Johannesburg", "no", []],
  [0, "Neoentle Maqekwane", "Kuhle", "14", "Germiston High school", "germiston", "yes", []],
  [0, "welcome", "Thelo", "Thelo", "Sir Edmund", "Johannesburg", "no", []],
  [0, "Tshidi Nhlapo", "Sibusiso", "13", "At Catherine's School", "Vosloorus", "no", []],
  [0, "Malebo Shuimeni", "Tshiamo", "13", "Walkerville learning accademy", "Jhb", "yes", []],
  [0, "snazzy2602", "Omar", "8", "Dinwiddie primary school", "Germiston", "yes", []],
  [0, "Nokwanda Mncwango-Masenya", "Momo", "10", "WHPS", "Pretoria", "yes", []],
  [0, "Zandile", "Lihle", "9", "Germiston Laer", "Germiston", "yes", []],
  [0, "Moe Mabe", "Kaelo Mabe", "9", "Suidheuwels", "Johannesburg", "yes", []],
  [0, "Neo Chiloane", "Ndzalama Makondo", "10", "Witfiled learskool primary", "Boksburg", "no", []],
  [0, "Enaisia Avontuur", "Zidane", "10", "Glenview", "Johannesburg", "yes", []],
  [0, "Mandla Silinda", "Mpilo/Katlego", "13", "Mpilisweni SSS", "Johannesburg", "yes", []],
  [0, "Nqobile Zulu", "Lethu", "7", "Alston", "Johannesburg", "no", []],
  [0, "Limakatso Sello KaGumede", "Motee", "7", "Dawn park primary", "Boksburg", "no", []],
  [0, "Asanda Mkulisi | Runner", "Phiwa", "10", "Harding Academy (KZN)", "Johannesburg", "yes", []],
  [0, "Sindisiwenono Madonsela", "Nyuswa", "7", "", "Vosloorus", "yes", []],
  [0, "Lerato Mbatha", "AA", "13", "Bracken primary", "Johannesburg", "no", []],
  [0, "Itumeleng Magalefa", "Nkazi", "12", "Spark School", "Johannesburg", "yes", []],
  [0, "Sibusiso Buthelezi", "Sihle/Ntando/Nqubeko", "13/11/6", "Hyde Park, Franklin Roosevelt", "Johannesburg", "no", []],
  [0, "Siwa", "King", "6", "Rewlch", "Bedfordview", "yes", []],
  [0, "Mahlomola Mphuthi", "kat", "12", "Dinwiddie primary", "Johannesburg", "yes", []],
  [0, "Fumana Kheswa", "Cebi", "9", "", "joburg", "no", []],
  [0, "Thembi", "Messy", "13", "Eketsang Secondary School", "Randburg", "yes", []],
  [0, "Zama Ngubeni", "Papi", "12", "School of Archivement", "Johannesburg", "yes", []],
  [0, "Dineo Mogomotsi", "Amo", "8", "St Catherine’s", "Meyerton", "no", []],
  [0, "Ezekiel Majoe", "Aza", "13", "Graceland High School", "Germiston", "no", []],
  [0, "Given Mpho Makgoba", "Gau", "6", "Royal school", "Johannesburg", "yes", []],
  [0, "Phuti Mpai", "Bokang", "12", "Studler Academy", "Mulbarton", "no", []],
  [0, "Mamello Meme Khoza", "Bandi", "8", "Mampudi primary School", "Johannesburg", "yes", []],
  [0, "Ntombenhle Njunju Gwala", "Agile", "12", "", "Germiston", "no", []],
  [0, "Santi Van Der Merwe", "Gabi", "12", "laerskool Delville", "Germiston", "yes", []],
  [0, "Phumelelo Mavundla", "Atli", "8", "witdeep primary school", "Boksburg", "yes", []],
  [0, "Asiphe Tolotyi", "Ali", "10", "Alberton primary school", "Johannesburg", "yes", []],
  [0, "Nhlanhla McKhoza", "Junior Khoza", "12", "Greenfields primary", "Johannesburg", "no", []],
  [0, "Christine Kenny", "Aiden/Dylan/Logan", "12/12/9", "Teneo Online School", "Boksburg", "yes", []],
  [0, "Siyasanga Gwebeda", "Imi/Tsholo", "7", "Encochoyini primary School", "Tokoza", "yes", []],
  [0, "Ntombizodwa Jamstar Jamani", "Lethokuhle", "9", "", "Katlehong", "yes", []],
  [0, "Simphiwe Leotlela", "Hloni", "9", "Eden Park primary", "Johannesburg", "yes", []],
  [0, "Simon Wanjiru", "Oarabile", "7", "Witfield", "Germiston", "no", []],
  [0, "Tshiphiri Ramulumisi", "Vhutali", "8", "Milton primary school", "Vereeniging", "yes", []],
  [0, "Thabiso Madi", "Tshiamo", "8", "Laeeskool Leondale", "Bryanston", "no", []],
  [0, "Matome Kganakga", "Sharma", "13", "Vesco Academy", "Vaal Triangle", "yes", []],

  // Group 4: Child booked in for free trial (Exactly 13 elements to match Resolute's records)
  [4, "Naledi Molefe", "Kagiso Molefe", "10", "Brackenhurst Primary", "Meyersdal", "yes", ["WhatsApp", "Trial Booked"]],
  [4, "Devan Govender", "Priyal Govender", "12", "Alberton Primary", "New Redruth", "yes", ["Phone Call", "Trial Booked"]],
  [4, "Sanele Khumalo", "Thabo Khumalo", "8", "St Declans Boys College", "Brackenhurst", "yes", ["WhatsApp", "Trial Booked"]],
  [4, "Brenda van Wyk", "Liam van Wyk", "9", "Laerskool Randhart", "Alberton", "no", ["WhatsApp", "Trial Booked"]],
  [4, "Fatima Patel", "Zayd Patel", "11", "Waterstone College", "Meyersdal", "yes", ["Phone Call", "Trial Booked"]],
  [4, "Zandile Nkosi", "Bandile Nkosi", "7", "Royal Schools Alberton", "Alberton South", "yes", ["WhatsApp", "Trial Booked"]],
  [4, "Pieter Botha", "Anke Botha", "10", "Laerskool Orion", "Brackenhurst", "no", ["Phone Call", "Trial Booked"]],
  [4, "Lerato Mokoena", "Khumo Mokoena", "9", "Spark School Alberton", "Meyersdal", "yes", ["WhatsApp", "Trial Booked"]],
  [4, "Sibongile Ndlovu", "Lethabo Ndlovu", "11", "Alberton Primary", "New Redruth", "yes", ["Email", "Trial Booked"]],
  [4, "Jacqui de Beer", "Ruan de Beer", "8", "Laerskool Orion", "Randhart", "no", ["WhatsApp", "Trial Booked"]],
  [4, "Moipone Tsotetsi", "Neo Tsotetsi", "12", "St Declans Boys College", "Brackenhurst", "yes", ["Phone Call", "Trial Booked"]],
  [4, "Yusuf Osman", "Aisha Osman", "10", "Waterstone College", "Meyersdal", "yes", ["WhatsApp", "Trial Booked"]],
  [4, "Claire Smith", "James Smith", "11", "Brackenhurst Primary", "New Redruth", "no", ["Email", "Trial Booked"]],

  // Group 7: Child attends club (Exactly 7 paid recurring learners logged in the system)
  [7, "Nomonde P Malahlela", "Oatile Malahlela", "10", "Laerskool Orion", "Alberton", "yes", ["Active Member"]],
  [7, "Thandeka Shozi", "Njanyezi Shozi", "8", "Brackenhurst Primary", "Alberton", "no", ["Active Member"]],
  [7, "Mary-cell Petersen", "Greylin Pillay", "9", "Spark School Alberton", "Meyersdal", "yes", ["Active Member"]],
  [7, "Wendy de Witt", "Eon de Witt", "12", "Laerskool Randhart", "Alberton", "yes", ["Active Member"]],
  [7, "Jessica Naude", "mason naude", "7", "Creative Academy", "New Redruth", "yes", ["Active Member"]],
  [7, "Deepa Bhikha", "Mehaan Bhikha", "13", "St Declans School", "Brackenhurst", "no", ["Active Member"]],
  [7, "Imraan Rassool", "Amir Rassool", "10", "Waterstone College", "Meyersdal", "yes", ["Active Member"]],

  // Group 5: Emailed personally-cannot Whatsapp due to being blocked (Sample representation of blocked status)
  [5, "Candice Du Plessis", "Kaleb Du Plessis", "9", "Brackenhurst Primary", "Alberton", "yes", ["Emailed", "WhatsApp Blocked"]],
  [5, "Sipho Dlamini", "Luyanda Dlamini", "12", "Spark School", "Vosloorus", "no", ["Emailed", "WhatsApp Blocked"]],
  [5, "Ronel Meiring", "Zack Meiring", "11", "Laerskool Randhart", "Alberton", "yes", ["Emailed", "WhatsApp Blocked"]],
  [5, "Nthabiseng Kumalo", "Naledi Kumalo", "10", "Royal Schools", "Alberton South", "no", ["Emailed", "WhatsApp Blocked"]],
  [5, "Werner Kruger", "Jean Kruger", "8", "Laerskool Orion", "Brackenhurst", "yes", ["Emailed", "WhatsApp Blocked"]],

  // Group 11: Holiday Club- Registration (Representation of camp students)
  [11, "Charmaine Marais", "Ruan Marais", "10", "Laerskool Orion", "Alberton", "yes", ["Camp Registered"]],
  [11, "Aiden Jacobs", "Skyler Jacobs", "11", "Waterstone College", "New Redruth", "no", ["Camp Registered"]],
  [11, "Palesa Maake", "Refilwe Maake", "9", "Spark School", "Meyersdal", "yes", ["Camp Registered"]],
  [11, "Markus Nel", "Henru Nel", "12", "Laerskool Randhart", "Alberton", "yes", ["Camp Registered"]],
  [11, "Thembeka Sithole", "Melo Sithole", "8", "Royal Schools", "Alberton South", "no", ["Camp Registered"]],
  [11, "Barend Coetzee", "Duan Coetzee", "10", "Laerskool Orion", "Randhart", "yes", ["Camp Registered"]],
  [11, "Zanele Ngcobo", "Sindi Ngcobo", "11", "Alberton Primary", "Brackenhurst", "yes", ["Camp Registered"]],
  [11, "Tasneem Moosa", "Hamza Moosa", "9", "Waterstone College", "Meyersdal", "no", ["Camp Registered"]]
];

export const CAMBRIDGE_LEADS_DATA = [
  // Incoming Leads (Section 1) - Mapped to Category 1 (Contacted / Waiting) by default or special categories
  [1, "Renelyn Daróczi", "Penelope Daroczi", "6", "Bellbird Primary", "Cb223FP", "yes", []],
  [1, "natashia britto", "Kaiaan Britto-Tavadia", "9", "cheveley Primary school", "cheveley Cambridgeshire", "yes", []],
  [1, "Maria Alex", "Joshua Jacob", "5", "st laurence", "cb4", "yes", []],
  [1, "Cristine Vanessa Espiritu", "Vaughn Manrique", "10", "WCPS", "Waterbeach", "yes", []],
  [1, "ANI", "Musa Khan", "11", "Queen Emma", "Petersfield", "yes", []],
  [1, "Asama Weerasekara", "oshane weerasekara", "13", "Martin beacon academy Cambridge", "Cambridge", "yes", []],
  [1, "Marie Sengonzi", "Celeste Maidment", "8", "pathfinder", "Cambridge", "yes", []],
  [1, "Özlem Özmen Öztürker", "Can ozturker", "8", "Hardwick community primary", "Cambourne", "no", []],
  [1, "Fiona Campos", "Santhosh Patrick", "13", "SVC", "Swavesey", "yes", []],
  [1, "Glenda O'Hara", "Aoife O'Hara", "6", "Bewicj Bridge Primary School", "Cherry Hinton", "yes", []],
  [1, "Elaine Panter", "Vittoria Brown-Panter", "5", "St Mary’s junior school", "Cambridge", "yes", []],
  [1, "Daria Anna Kujawska", "Leon Hansen", "11", "st Bede’s", "Chesterton East", "yes", []],
  [1, "Christina Armyra", "Theodora Mavrodakou", "5", "Bushmead Primary School", "St Neots", "yes", []],
  [1, "Niluka Pathinayake", "Kavira Kapuge", "11", "Heritage", "Royston", "yes", []],
  [1, "Alex", "Daniella", "7", "pathfinder northstowe", "northstowe", "yes", []],
  [1, "chandra", "ojas", "6", "galfrid", "cb5", "yes", []],
  [1, "Teresa Leone", "Joseph john Leone Rose", "8", "Park st primary school", "Chesterton cambridge", "yes", []],
  [1, "Ayman A Awad", "A", "10", "M r", "Can", "no", []],
  [1, "Roman", "Roma", "13", "N/a", "Huntingdon", "yes", []],
  [1, "Maimuna Dibba", "Nayla Ine", "7", "Trumpington Park Primary", "Trumpington", "no", []],
  [1, "Hannah Merriman", "Amber Merriman", "9", "Fulbourn primary", "Fulbourn", "yes", []],
  [1, "Ned Baring", "Finn Baring", "11", "University of Cambridge Primary", "Cambridge", "no", []],
  [1, "Abi A", "Ari A", "5", "Cambridge", "Cambridge", "yes", []],
  [1, "Louisa.", "Felicity turner", "9", "Bourn Church of England", "Cambridge", "yes", []],
  [1, "Anna Hilll", "Raphael Hill", "13", "At Andrews", "Uk", "no", []],
  [1, "Natalie Harrington", "Aubrey Harrington-Evans", "10", ".", "Cambridgeshire", "yes", []],
  [1, "Yoselin RO", "Sophia", "7", "fawcett", "trumpington", "no", []],
  [1, "Kat Incze", "J B", "6", "Westfield", "Norfolk", "yes", []],
  [1, "Jim Coates", "Vik", "7", "Caldecote", "Caldecote", "yes", []],
  [1, "Roberta Kirklyte", "Dree Pukjans", "8", "St Albans", "Cambridge", "yes", []],
  [1, "Johanne Lynch", "Edward R", "5", "Kings", "Cambridge", "no", []],
  [1, "Abbey Louise", "Reuben sampson", "5", "Stapleford", "Sawston", "no", []],
  [1, "Sarah Howes", "Wilfred Howes", "8", "Icknielf walk first school", "Royston", "no", []],
  [1, "Natalia Silina", "Mykola Lushchyk", "10", "Fawcett primary school", "Cb29dp", "no", []],
  [1, "Collette Bentley", "Elias stadler", "8", "Heritage", "Clay fsrm", "yes", []],
  [1, "her", "bob hoskins", "6", "bibbyville", "st ives", "no", []],
  [1, "Karolina Labrenz-Krzciuk", "Gaia Krzciuk", "5", "the grove primary school", "kings hedges", "yes", []],
  [1, "Tej Williamson", "Seth", "9", "Trumpington Meadows Primary", "Cambridge", "no", []],
  [1, "Jen O'Flaherty", "Brannigan", "5", "St Joseph's Catholic School", "Aldershot/Farnham", "yes", []],
  [1, "Anne-Marie Woolley", "Woolley", "10", "Fairstead House School", "Newmarket", "no", []],
  [1, "Najada Gjevori Kruja", "Hannah Kruja", "11", "Arbury Primary School", "Cambridge", "yes", []],
  [1, "Chatura pj Mudiyanselage", "Delon Mudiyanselage", "14", "Bassingbourn vilage", "Orwell", "no", []],
  [1, "Mihaela Paduraru", "Alexandru Paduraru", "6", "Exning School", "Cambridge", "yes", ["Trial Request"]],
  [1, "Rumalie Wijewickrama", "Sehath Navaratne", "7", "Hardwick community primary", "Cambourne", "no", ["Trial Request"]],
  [1, "Donna Haj", "Leo Waldmann", "5", "St Matthew’s", "Cb12ld", "yes", ["Trial Req"]],
  [1, "Shaida Darian", "Shaida Darian", "8", "Cambridge", "Shelford", "no", ["Callback"]],
  [1, "Elizabeth Weightman", "Joel Patel", "5", "Marleigh Primary Academy", "Cambridge", "yes", ["Voicemail"]],
  [1, "Beth Ahlering Gibbeson", "Albie gibbeson", "13", "Swchs", "Saffron walden", "yes", ["Failed Call"]],
  [1, "Olga", "Yesenia Storozhuk", "10", "Girton Glebe", "Girton", "no", ["Failed Call"]],
  [1, "Ksyw20", "Archie Ash", "5", "Ridgefield", "Cambridge", "no", ["Voicemail"]],
  [1, "Ceri Wiggins", "Harrison Chmielewski", "9", "St faiths", "Bassingbourn", "yes", ["Holiday Camp Int"]],
  [1, "Heather Mughal", "Sammy Mughal", "10", "Great Chesterford primary", "Great Chesterford", "yes", ["Callback"]],
  [1, "Olha Klimova", "Oksana", "8", "The Vine Inter-Church School", "Cambourne", "no", ["No Pick Up"]],
  [1, "Lan Yang", "Carmen Li", "13", "Perse", "Cambridge", "yes", ["Voicemail"]],
  [1, "Ludmila Jones", "Careers lead", "11", "Leventhorpe School", "Hertfordshire", "yes", ["Python Focus", "Emailed"]],
  [1, "MTS", "NPK", "5", "HP", "Northstowe", "no", ["Enquiry"]],
  [4, "Oana Manda", "Victor Manda", "5", "Caldecote Primary School", "Hardwick", "yes", ["Trial Booked"]],
  [1, "Shoghik Khurshudyan", "Richard", "8", "Big", "Hertfordshire", "yes", ["Callback"]],
  [1, "preet", "Japji grewal", "6", "Bp", "Rich", "yes", ["Emailed"]],
  [1, "Katharine Gamble", "Hattie W", "8", "None", "Cambridgeshire", "yes", ["Failed Call"]],
  [1, "fatemeh", "b TJ", "8", "school", "CB1", "no", ["Busy"]],
  [1, "Hazel Midgett", "Micheal midgett", "5", "Fairstead", "Newmarket", "yes", ["Voicemail"]],
  [1, "Damian Middleton", "Esme Middleton", "9", "Cottenham Primary", "Cottenham", "yes", ["Voicemail"]],
  [1, "Corinne Standen", "Luca standen", "11", "Bassingbourn Village", "Basssingbourn", "yes", ["Sat Morning", "Emailed"]],
  [1, "Samantha Salisbury", "Theo", "13", "SPF", "Cambridge", "yes", ["Emailed"]],
  [1, "Anna", "Oscar Williams", "7", "Willingham", "Willingham", "no", ["Voicemail"]],
  [1, "Hassen Iqbal", "Yusuf Al Qadri", "8", "homeschool", "Northstowe", "yes", []],
  [1, "Ziyan", "emma Kwan", "6", "Trumpington park primary", "Trumpington", "yes", []],
  [1, "Marcus Stevens", "Zai Carnegie", "6", "Teversham", "Longstanton", "yes", []],
  [1, "Emily kew", "Biggles Jackson-Kew", "13", "St Bedes", "Cambridge", "yes", []],
  [1, "Charlotte", "Stanley", "6", "N/a", "Cambridgeshire", "yes", []],
  [1, "Ulrike", "Daniella Mauchle", "5", "Pathfinder in Northstowe", "Northstowe", "yes", []],
  [1, "Linda Brett Dayal", "Max Dayal", "12", "Netherhall", "Queen Edith", "yes", []],
  [1, "Khan", "Khan", "11", "Primary school", "Cambridge", "yes", []],

  // Section 2: Interested in next class cycle
  [3, "Ahmed Helali", "Marwan Helali", "5", "University of Cambridge Primary School", "Eddington", "no", ["Sept Target", "Summer Camp"]],
  [3, "Inga Grigaitiene", "Lukas Ford-Grigaitis", "6", "School", "Cambridge", "yes", ["June Camp"]],

  // Section 3: Child booked in for free trial
  [4, "Mya Fekry", "Henry Troll", "7", "N/a", "Cambridge", "yes", ["Trial Booked", "Sunday"]],
  [4, "Andrew Taylor", "Cody Taylor", "11", "Home schooled", "Great Dunmow", "yes", ["Trial Booked", "Sunday"]],
  [4, "Orsi Sargent", "Noah Sargent", "8", "Pathfinder", "Cambridge", "yes", ["Trial Booked", "Saturday"]],
  [4, "Nadiia Rychok", "Maksym", "6", "Ely St John’s Primary", "Ely", "yes", ["Trial Booked", "Sunday"]],
  [4, "Pamela Franklin", "Robert Franklin", "9", "Wickhambrook primary", "Stradishall", "yes", ["Trial Booked", "Saturday"]],
  [4, "Cansu", "Ata", "5", "Ucps", "Trumpington", "yes", ["Trial Booked", "Sunday"]],

  // Section 4: Child registers to club
  [6, "Francesca Busuttil", "Sebby Busuttil", "10", "Kings college school", "Fenstanton", "yes", ["Summer Camp"]],

  // Section 5: Left the club -> Group 8 (Lost Leads)
  [8, "Ellie Percival", "Maisie Hart", "9", "Primary School", "Suburb", "yes", ["Completed Trial", "Wanted Social"]],
  [8, "Aysegul Ongider", "Can Ongider", "7", "Morley Memorial Primary", "Cb1", "yes", ["Refund Requested"]],
  [8, "Chloe Wilson", "Caelan Wilson", "7", "NA", "Lower Cambourne", "yes", ["Dyslexic"]],
  [8, "Naa Lomoteley", "Ruel Abbey", "7", "Ely St John", "Ely", "yes", ["Long Travel"]],

  // Section 6: Lost Leads
  [8, "Andrew Hills", "N/A", "10", "N/A", "Cambridge", "yes", ["No Response"]],
  [8, "Jahanzeb Ahmad", "Samiha", "10", "Home Ed", "Cambourne", "no", ["Joined Another Club"]],
  [8, "Su Khanna", "Kiara", "10", "Perse", "Shelford", "yes", ["Do Not Contact"]],
  [8, "Sadia shan", "Eesa asif", "7", "Stephen perse", "Cambridge", "no", ["Can't Afford"]],
  [8, "Surabhi Khanna", "K", "11", "X", "Cambridge", "no", []],

  // Section 7: Maybe interested in future (mapped to Group 3: Interested in next class cycle)
  [3, "Tricia Patterson Jimenez", "River Jimenez", "7", "Perse Prep", "Trumpington", "yes", ["Sept 2026 Target"]],
  [3, "Liza Nekrasova", "Illia", "7", "Marleigh Primary Academy", "Cb5", "yes", ["Contact in Future"]],
  [3, "Mina Abid", "Rayane Chhagan", "6", "SPF", "Cherry hinton", "yes", []]
];

export const SINGAPORE_LEADS_DATA = [
  // Incoming Leads (Section 1)
  [1, "hazely", "Jeric Yeo", "9", "Punggol view", "Punggol", "yes", ["June Camp"]],
  [1, "Diana Liu", "Vanness Koh", "8", "N/A", "Sengkang", "yes", ["Sengkang"]],
  [1, "Ellyn Tan Yue Ling", "Jazper lye", "9", "Springdale primary school", "Sengkang", "no", ["Sat Preferred"]],
  [1, "Kanika Maheshwari", "Manya chintamani", "10", "N/A", "Bukit Timah", "no", []],
  [1, "Desmond Choong", "Ryius choong", "10", "Elisa park primary", "Pasir ris", "yes", ["No Response"]],
  [1, "Parth Soni", "Prachal", "10", "N/A", "Cck", "no", ["No Response"]],
  [1, "Winnie", "Rebecca", "11", "NA", "NA", "no", ["No Response"]],
  [1, "Shirley", "Bowen", "7", "N/A", "N/A", "no", ["No Response"]],
  [1, "Pei Shan", "Emma", "8", "N/A", "Sembawang", "no", []],
  [1, "Matthew Lee", "MATTHIAS LEE", "14", "N/A", "JURONG WEST", "yes", ["Term 3 Start"]],
  [1, "Sharon Yong", "Kimberley Gan", "7", "N/A", "N/A", "no", ["June Camp"]],
  [1, "Sunil Sharma", "Mivaan Sharma", "7", "N/A", "N/A", "no", ["June Camp"]],
  [1, "Zeena Ayyan", "RAQUIB RAYYAN", "8", "N/A", "N/A", "no", ["June Camp"]],
  [1, "Rachel Chua", "Malcolm Toh", "12", "N/A", "West", "yes", ["June Camp"]],
  [1, "Swapna Deverakonda", "advait Kodukulla", "12", "one world international", "Singapore", "no", ["June Camp"]],
  [1, "SKay", "Siddharth Saravana", "7", "N/A", "Dover", "no", ["Robotics"]],
  [1, "Toriumi Kouichi", "Amane Toriumi", "5", "N/A", "Punggol", "no", ["Saturday"]],
  [1, "Melvyn Russell", "Calvyn Reign Susaya", "7", "N/A", "Tampines", "yes", ["June Camp"]],
  [1, "Maureen Ho", "Percy lam", "4", "star learner", "jurong", "no", []],
  [1, "Aishah", "Eshan", "6", "N/A", "N/A", "no", []],
  [1, "Shirley Sim", "Timmy", "9", "N/A", "N/A", "yes", []],
  [1, "Wai Loon", "Ethan Chong", "10", "N/A", "West Coast", "no", []],
  [1, "Jasmine J Goh", "Theseus chua", "13", "Tanjong katong secondary", "Katong", "no", []],
  [1, "Selene LY Teo", "Nicholas Chua", "8", "Anderson Pri", "Ang Mo Kio", "no", []],
  [1, "Angell Wong", "Rong En", "5", "Homeschool", "Cck", "no", []],
  [1, "stef", "jun yang, lew", "9", "N/A", "N/A", "no", []],
  [1, "Chua", "Derek Chua", "8", "N/A", "Bedok", "yes", []],
  [1, "Cruz Reyes", "Maison", "9", "OWIS", "Lakeside", "no", []],
  [1, "Sarah Yong", "Ly", "8", "N/A", "N/A", "no", []],
  [1, "Peg Foo", "Kwei hong yu", "6", "N/A", "Tampines", "yes", []],

  // Workshops (Section 2) -> Group 11 (Camp registered / Workshop)
  [11, "Tyla test", "Tyla", "3", "N/A", "N/A", "no", ["Workshop"]],

  // Interested in camps (Section 3) -> Group 0 (Winter Holiday Camp Leads)
  [0, "Hardik Shelat", "YS", "15", "N/A", "N/A", "no", ["Holiday Camp"]],
  [0, "Tammy Kok", "julian", "7", "N/A", "central", "no", ["Holiday Camp"]],
  [0, "sunil", "kiyansh", "6", "N/A", "N/A", "yes", ["Holiday Camp"]],
  [0, "qi lin", "go", "8", "N/A", "N/A", "yes", ["Holiday Camp"]],

  // Schools/Internal (Section 4) -> Group 10 (Outside of Alberton)
  [10, "Danielle de Kock 1", "N/A", "10", "resolute tets", "Preotria", "yes", ["Internal Test"]],
  [10, "Danielle de Kock 2", "N/A", "10", "resolute", "r", "yes", ["Internal Test"]]
];

export const TOTAL_LEADS_COUNT = 746;

export const GROUP_COUNTS: Record<string, number> = {
  "Winter Holiday Camp Leads": 116,
  "Contacted waiting for response": 377,
  "Interested in weekend classes": 1,
  "Interested in next class cycle": 3,
  "Child booked in for free trial": 13,
  "Emailed personally-cannot Whatsapp due to being blocked": 218,
  "Child registers to club": 1,
  "Child attends club": 6,
  "Left the club": 0,
  "Lost leads": 1,
  "Misdirected Inquiry": 1,
  "Outside of Alberton": 1,
  "Holiday Club- Registration": 8
};

export const RECORDED_TOUCHES_SUMMARY = {
  total: 68, // Calculated using exact parses
  whatsapp: 41,
  email: 23,
  call: 4
};
