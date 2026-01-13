import { StandardCategory } from "./types";

// Helper to normalize grade input
export const normalizeGrade = (input: string): string => {
  const normalized = input.toLowerCase().trim();
  if (normalized.includes('k') || normalized.includes('kinder')) return 'K';
  const match = normalized.match(/\d+/);
  if (match) {
    const num = parseInt(match[0]);
    if (num >= 9 && num <= 12) return 'HS';
    return match[0];
  }
  if (normalized.includes('high') || normalized.includes('hs')) return 'HS';
  return '5'; // Default fallback
};

// Helper to normalize subject input
export const normalizeSubject = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('math')) return 'Mathematics';
  if (lower.includes('english') || lower.includes('ela') || lower.includes('literacy') || lower.includes('reading') || lower.includes('writing')) return 'ELA';
  if (lower.includes('science') || lower.includes('ngss') || lower.includes('biology') || lower.includes('physics') || lower.includes('chemistry')) return 'Science';
  if (lower.includes('history') || lower.includes('social') || lower.includes('civics') || lower.includes('economics')) return 'History';
  return 'Other';
};

/* -------------------------------------------------------------------------- */
/*                                MATHEMATICS                                 */
/* -------------------------------------------------------------------------- */
const MATH_STANDARDS: Record<string, StandardCategory[]> = {
  "K": [
    {
      domain: "Counting & Cardinality",
      standards: [
        { code: "K.CC.A.1", description: "Count to 100 by ones and by tens." },
        { code: "K.CC.A.2", description: "Count forward beginning from a given number within the known sequence." },
        { code: "K.CC.A.3", description: "Write numbers from 0 to 20. Represent a number of objects with a written numeral." },
        { code: "K.CC.B.4", description: "Understand the relationship between numbers and quantities; connect counting to cardinality." },
        { code: "K.CC.B.5", description: "Count to answer 'how many?' questions about as many as 20 things." },
        { code: "K.CC.C.6", description: "Identify whether the number of objects in one group is greater than, less than, or equal to another." },
        { code: "K.CC.C.7", description: "Compare two numbers between 1 and 10 presented as written numerals." }
      ]
    },
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "K.OA.A.1", description: "Represent addition and subtraction with objects, fingers, mental images, drawings, or sounds." },
        { code: "K.OA.A.2", description: "Solve addition and subtraction word problems, and add and subtract within 10." },
        { code: "K.OA.A.3", description: "Decompose numbers less than or equal to 10 into pairs in more than one way." },
        { code: "K.OA.A.4", description: "For any number from 1 to 9, find the number that makes 10 when added to the given number." },
        { code: "K.OA.A.5", description: "Fluently add and subtract within 5." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "K.NBT.A.1", description: "Compose and decompose numbers from 11 to 19 into ten ones and some further ones." }
      ]
    },
    {
      domain: "Measurement & Data",
      standards: [
        { code: "K.MD.A.1", description: "Describe measurable attributes of objects, such as length or weight." },
        { code: "K.MD.A.2", description: "Directly compare two objects with a measurable attribute in common." },
        { code: "K.MD.B.3", description: "Classify objects into given categories; count the numbers of objects in each category." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "K.G.A.1", description: "Describe objects in the environment using names of shapes." },
        { code: "K.G.A.2", description: "Correctly name shapes regardless of their orientations or overall size." },
        { code: "K.G.B.4", description: "Analyze and compare two- and three-dimensional shapes." }
      ]
    }
  ],
  "1": [
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "1.OA.A.1", description: "Use addition and subtraction within 20 to solve word problems." },
        { code: "1.OA.A.2", description: "Solve word problems that call for addition of three whole numbers." },
        { code: "1.OA.B.3", description: "Apply properties of operations as strategies to add and subtract (Commutative/Associative)." },
        { code: "1.OA.B.4", description: "Understand subtraction as an unknown-addend problem." },
        { code: "1.OA.C.5", description: "Relate counting to addition and subtraction." },
        { code: "1.OA.C.6", description: "Add and subtract within 20, demonstrating fluency for addition and subtraction within 10." },
        { code: "1.OA.D.7", description: "Understand the meaning of the equal sign." },
        { code: "1.OA.D.8", description: "Determine the unknown whole number in an addition or subtraction equation." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "1.NBT.A.1", description: "Count to 120, starting at any number less than 120." },
        { code: "1.NBT.B.2", description: "Understand that the two digits of a two-digit number represent amounts of tens and ones." },
        { code: "1.NBT.B.3", description: "Compare two two-digit numbers based on meanings of the tens and ones digits." },
        { code: "1.NBT.C.4", description: "Add within 100, including adding a two-digit number and a one-digit number." },
        { code: "1.NBT.C.5", description: "Given a two-digit number, mentally find 10 more or 10 less." },
        { code: "1.NBT.C.6", description: "Subtract multiples of 10 in the range 10-90." }
      ]
    },
    {
      domain: "Measurement & Data",
      standards: [
        { code: "1.MD.A.1", description: "Order three objects by length." },
        { code: "1.MD.A.2", description: "Express the length of an object as a whole number of length units." },
        { code: "1.MD.B.3", description: "Tell and write time in hours and half-hours using analog and digital clocks." },
        { code: "1.MD.C.4", description: "Organize, represent, and interpret data with up to three categories." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "1.G.A.1", description: "Distinguish between defining attributes and non-defining attributes." },
        { code: "1.G.A.2", description: "Compose two-dimensional shapes or three-dimensional shapes to create a composite shape." },
        { code: "1.G.A.3", description: "Partition circles and rectangles into two and four equal shares." }
      ]
    }
  ],
  "2": [
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "2.OA.A.1", description: "Use addition and subtraction within 100 to solve one- and two-step word problems." },
        { code: "2.OA.B.2", description: "Fluently add and subtract within 20 using mental strategies." },
        { code: "2.OA.C.3", description: "Determine whether a group of objects (up to 20) has an odd or even number of members." },
        { code: "2.OA.C.4", description: "Use addition to find the total number of objects arranged in rectangular arrays." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "2.NBT.A.1", description: "Understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones." },
        { code: "2.NBT.A.2", description: "Count within 1000; skip-count by 5s, 10s, and 100s." },
        { code: "2.NBT.A.3", description: "Read and write numbers to 1000 using base-ten numerals, number names, and expanded form." },
        { code: "2.NBT.A.4", description: "Compare two three-digit numbers." },
        { code: "2.NBT.B.5", description: "Fluently add and subtract within 100 using strategies based on place value." },
        { code: "2.NBT.B.6", description: "Add up to four two-digit numbers." },
        { code: "2.NBT.B.7", description: "Add and subtract within 1000, using concrete models or drawings." }
      ]
    },
    {
      domain: "Measurement & Data",
      standards: [
        { code: "2.MD.A.1", description: "Measure the length of an object by selecting and using appropriate tools." },
        { code: "2.MD.B.5", description: "Use addition and subtraction within 100 to solve word problems involving lengths." },
        { code: "2.MD.C.7", description: "Tell and write time from analog and digital clocks to the nearest five minutes." },
        { code: "2.MD.C.8", description: "Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies." },
        { code: "2.MD.D.10", description: "Draw a picture graph and a bar graph to represent a data set with up to four categories." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "2.G.A.1", description: "Recognize and draw shapes having specified attributes." },
        { code: "2.G.A.3", description: "Partition circles and rectangles into two, three, or four equal shares." }
      ]
    }
  ],
  "3": [
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "3.OA.A.1", description: "Interpret products of whole numbers (e.g., 5 × 7 as 5 groups of 7)." },
        { code: "3.OA.A.2", description: "Interpret whole-number quotients of whole numbers." },
        { code: "3.OA.A.3", description: "Use multiplication and division within 100 to solve word problems." },
        { code: "3.OA.A.4", description: "Determine the unknown whole number in a multiplication or division equation." },
        { code: "3.OA.B.5", description: "Apply properties of operations as strategies to multiply and divide." },
        { code: "3.OA.C.7", description: "Fluently multiply and divide within 100." },
        { code: "3.OA.D.8", description: "Solve two-step word problems using the four operations." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "3.NBT.A.1", description: "Use place value understanding to round whole numbers to the nearest 10 or 100." },
        { code: "3.NBT.A.2", description: "Fluently add and subtract within 1000." },
        { code: "3.NBT.A.3", description: "Multiply one-digit whole numbers by multiples of 10 in the range 10-90." }
      ]
    },
    {
      domain: "Number & Operations - Fractions",
      standards: [
        { code: "3.NF.A.1", description: "Understand a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts." },
        { code: "3.NF.A.2", description: "Understand a fraction as a number on the number line." },
        { code: "3.NF.A.3", description: "Explain equivalence of fractions in special cases, and compare fractions by reasoning about their size." }
      ]
    },
    {
      domain: "Measurement & Data",
      standards: [
        { code: "3.MD.A.1", description: "Tell and write time to the nearest minute and measure time intervals in minutes." },
        { code: "3.MD.C.5", description: "Recognize area as an attribute of plane figures and understand concepts of area measurement." },
        { code: "3.MD.C.7", description: "Relate area to the operations of multiplication and addition." },
        { code: "3.MD.D.8", description: "Solve real world and mathematical problems involving perimeters of polygons." }
      ]
    }
  ],
  "4": [
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "4.OA.A.1", description: "Interpret a multiplication equation as a comparison." },
        { code: "4.OA.A.3", description: "Solve multistep word problems posed with whole numbers and having whole-number answers." },
        { code: "4.OA.B.4", description: "Find all factor pairs for a whole number in the range 1-100." },
        { code: "4.OA.C.5", description: "Generate a number or shape pattern that follows a given rule." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "4.NBT.A.1", description: "Recognize that in a multi-digit whole number, a digit in one place represents ten times what it represents in the place to its right." },
        { code: "4.NBT.A.2", description: "Read and write multi-digit whole numbers using base-ten numerals, number names, and expanded form." },
        { code: "4.NBT.A.3", description: "Use place value understanding to round multi-digit whole numbers to any place." },
        { code: "4.NBT.B.4", description: "Fluently add and subtract multi-digit whole numbers using the standard algorithm." },
        { code: "4.NBT.B.5", description: "Multiply a whole number of up to four digits by a one-digit whole number, and multiply two two-digit numbers." },
        { code: "4.NBT.B.6", description: "Find whole-number quotients and remainders with up to four-digit dividends and one-digit divisors." }
      ]
    },
    {
      domain: "Number & Operations - Fractions",
      standards: [
        { code: "4.NF.A.1", description: "Explain why a fraction a/b is equivalent to a fraction (n × a)/(n × b)." },
        { code: "4.NF.A.2", description: "Compare two fractions with different numerators and different denominators." },
        { code: "4.NF.B.3", description: "Understand a fraction a/b with a > 1 as a sum of fractions 1/b." },
        { code: "4.NF.B.4", description: "Apply and extend previous understandings of multiplication to multiply a fraction by a whole number." },
        { code: "4.NF.C.5", description: "Express a fraction with denominator 10 as an equivalent fraction with denominator 100." },
        { code: "4.NF.C.6", description: "Use decimal notation for fractions with denominators 10 or 100." },
        { code: "4.NF.C.7", description: "Compare two decimals to hundredths by reasoning about their size." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "4.G.A.1", description: "Draw points, lines, line segments, rays, angles, and perpendicular and parallel lines." },
        { code: "4.G.A.2", description: "Classify two-dimensional figures based on the presence or absence of parallel or perpendicular lines." }
      ]
    }
  ],
  "5": [
    {
      domain: "Operations & Algebraic Thinking",
      standards: [
        { code: "5.OA.A.1", description: "Use parentheses, brackets, or braces in numerical expressions, and evaluate expressions with these symbols." },
        { code: "5.OA.A.2", description: "Write simple expressions that record calculations with numbers, and interpret numerical expressions." }
      ]
    },
    {
      domain: "Number & Operations in Base Ten",
      standards: [
        { code: "5.NBT.A.1", description: "Recognize that in a multi-digit number, a digit in one place represents 10 times as much as it represents in the place to its right." },
        { code: "5.NBT.A.3", description: "Read, write, and compare decimals to thousandths." },
        { code: "5.NBT.A.4", description: "Use place value understanding to round decimals to any place." },
        { code: "5.NBT.B.5", description: "Fluently multiply multi-digit whole numbers using the standard algorithm." },
        { code: "5.NBT.B.6", description: "Find whole-number quotients of whole numbers with up to four-digit dividends and two-digit divisors." },
        { code: "5.NBT.B.7", description: "Add, subtract, multiply, and divide decimals to hundredths." }
      ]
    },
    {
      domain: "Number & Operations - Fractions",
      standards: [
        { code: "5.NF.A.1", description: "Add and subtract fractions with unlike denominators (including mixed numbers)." },
        { code: "5.NF.A.2", description: "Solve word problems involving addition and subtraction of fractions." },
        { code: "5.NF.B.3", description: "Interpret a fraction as division of the numerator by the denominator (a/b = a ÷ b)." },
        { code: "5.NF.B.4", description: "Apply and extend previous understandings of multiplication to multiply a fraction or whole number by a fraction." },
        { code: "5.NF.B.7", description: "Apply and extend previous understandings of division to divide unit fractions by whole numbers and whole numbers by unit fractions." }
      ]
    },
    {
      domain: "Measurement & Data",
      standards: [
        { code: "5.MD.A.1", description: "Convert among different-sized standard measurement units within a given measurement system." },
        { code: "5.MD.C.3", description: "Recognize volume as an attribute of solid figures and understand concepts of volume measurement." },
        { code: "5.MD.C.5", description: "Relate volume to the operations of multiplication and addition and solve real world and mathematical problems." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "5.G.A.1", description: "Use a pair of perpendicular number lines, called axes, to define a coordinate system." },
        { code: "5.G.B.3", description: "Understand that attributes belonging to a category of two-dimensional figures also belong to all subcategories of that category." }
      ]
    }
  ],
  "6": [
    {
      domain: "Ratios & Proportional Relationships",
      standards: [
        { code: "6.RP.A.1", description: "Understand the concept of a ratio and use ratio language to describe a ratio relationship." },
        { code: "6.RP.A.2", description: "Understand the concept of a unit rate a/b associated with a ratio a:b." },
        { code: "6.RP.A.3", description: "Use ratio and rate reasoning to solve real-world and mathematical problems (e.g., tables, unit pricing)." }
      ]
    },
    {
      domain: "The Number System",
      standards: [
        { code: "6.NS.A.1", description: "Interpret and compute quotients of fractions, and solve word problems involving division of fractions by fractions." },
        { code: "6.NS.B.2", description: "Fluently divide multi-digit numbers using the standard algorithm." },
        { code: "6.NS.B.3", description: "Fluently add, subtract, multiply, and divide multi-digit decimals using the standard algorithm." },
        { code: "6.NS.C.5", description: "Understand that positive and negative numbers are used together to describe quantities having opposite directions or values." },
        { code: "6.NS.C.6", description: "Understand a rational number as a point on the number line." },
        { code: "6.NS.C.8", description: "Solve real-world and mathematical problems by graphing points in all four quadrants of the coordinate plane." }
      ]
    },
    {
      domain: "Expressions & Equations",
      standards: [
        { code: "6.EE.A.1", description: "Write and evaluate numerical expressions involving whole-number exponents." },
        { code: "6.EE.A.2", description: "Write, read, and evaluate expressions in which letters stand for numbers." },
        { code: "6.EE.A.3", description: "Apply the properties of operations to generate equivalent expressions." },
        { code: "6.EE.B.5", description: "Understand solving an equation or inequality as a process of answering a question." },
        { code: "6.EE.B.7", description: "Solve real-world and mathematical problems by writing and solving equations of the form x + p = q and px = q." }
      ]
    },
    {
      domain: "Statistics & Probability",
      standards: [
        { code: "6.SP.A.2", description: "Understand that a set of data collected to answer a statistical question has a distribution." },
        { code: "6.SP.B.4", description: "Display numerical data in plots on a number line, including dot plots, histograms, and box plots." }
      ]
    }
  ],
  "7": [
    {
      domain: "Ratios & Proportional Relationships",
      standards: [
        { code: "7.RP.A.1", description: "Compute unit rates associated with ratios of fractions." },
        { code: "7.RP.A.2", description: "Recognize and represent proportional relationships between quantities." },
        { code: "7.RP.A.3", description: "Use proportional relationships to solve multistep ratio and percent problems." }
      ]
    },
    {
      domain: "The Number System",
      standards: [
        { code: "7.NS.A.1", description: "Apply and extend previous understandings of addition and subtraction to add and subtract rational numbers." },
        { code: "7.NS.A.2", description: "Apply and extend previous understandings of multiplication and division to rational numbers." },
        { code: "7.NS.A.3", description: "Solve real-world and mathematical problems involving the four operations with rational numbers." }
      ]
    },
    {
      domain: "Expressions & Equations",
      standards: [
        { code: "7.EE.A.1", description: "Apply properties of operations as strategies to add, subtract, factor, and expand linear expressions." },
        { code: "7.EE.B.3", description: "Solve multi-step real-life and mathematical problems posed with positive and negative rational numbers." },
        { code: "7.EE.B.4", description: "Use variables to represent quantities in a real-world or mathematical problem, and construct simple equations and inequalities." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "7.G.A.1", description: "Solve problems involving scale drawings of geometric figures." },
        { code: "7.G.B.4", description: "Know the formulas for the area and circumference of a circle and use them to solve problems." },
        { code: "7.G.B.6", description: "Solve real-world and mathematical problems involving area, volume and surface area." }
      ]
    }
  ],
  "8": [
    {
      domain: "The Number System",
      standards: [
        { code: "8.NS.A.1", description: "Know that numbers that are not rational are called irrational." },
        { code: "8.NS.A.2", description: "Use rational approximations of irrational numbers to compare the size of irrational numbers." }
      ]
    },
    {
      domain: "Expressions & Equations",
      standards: [
        { code: "8.EE.A.1", description: "Know and apply the properties of integer exponents to generate equivalent numerical expressions." },
        { code: "8.EE.B.5", description: "Graph proportional relationships, interpreting the unit rate as the slope of the graph." },
        { code: "8.EE.B.6", description: "Use similar triangles to explain why the slope m is the same between any two distinct points on a non-vertical line." },
        { code: "8.EE.C.7", description: "Solve linear equations in one variable." },
        { code: "8.EE.C.8", description: "Analyze and solve pairs of simultaneous linear equations." }
      ]
    },
    {
      domain: "Functions",
      standards: [
        { code: "8.F.A.1", description: "Understand that a function is a rule that assigns to each input exactly one output." },
        { code: "8.F.A.3", description: "Interpret the equation y = mx + b as defining a linear function." },
        { code: "8.F.B.4", description: "Construct a function to model a linear relationship between two quantities." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "8.G.A.3", description: "Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures." },
        { code: "8.G.B.7", description: "Apply the Pythagorean Theorem to determine unknown side lengths in right triangles." },
        { code: "8.G.C.9", description: "Know the formulas for the volumes of cones, cylinders, and spheres and use them to solve real-world problems." }
      ]
    }
  ],
  "HS": [
    {
      domain: "Number & Quantity",
      standards: [
        { code: "HSN-RN.A.1", description: "Explain how the definition of the meaning of rational exponents follows from extending the properties of integer exponents." },
        { code: "HSN-Q.A.1", description: "Use units as a way to understand problems and to guide the solution of multi-step problems." }
      ]
    },
    {
      domain: "Algebra",
      standards: [
        { code: "HSA-SSE.A.2", description: "Use the structure of an expression to identify ways to rewrite it." },
        { code: "HSA-CED.A.1", description: "Create equations and inequalities in one variable and use them to solve problems." },
        { code: "HSA-CED.A.2", description: "Create equations in two or more variables to represent relationships between quantities." },
        { code: "HSA-REI.B.4", description: "Solve quadratic equations by inspection, taking square roots, completing the square, the quadratic formula and factoring." },
        { code: "HSA-REI.C.6", description: "Solve systems of linear equations exactly and approximately." },
        { code: "HSA-REI.D.10", description: "Understand that the graph of an equation in two variables is the set of all its solutions plotted in the coordinate plane." }
      ]
    },
    {
      domain: "Functions",
      standards: [
        { code: "HSF-IF.B.4", description: "For a function that models a relationship between two quantities, interpret key features of graphs and tables." },
        { code: "HSF-IF.C.7", description: "Graph functions expressed symbolically and show key features of the graph." },
        { code: "HSF-LE.A.1", description: "Distinguish between situations that can be modeled with linear functions and with exponential functions." }
      ]
    },
    {
      domain: "Geometry",
      standards: [
        { code: "HSG-CO.A.5", description: "Given a geometric figure and a rotation, reflection, or translation, draw the transformed figure." },
        { code: "HSG-SRT.B.5", description: "Use congruence and similarity criteria for triangles to solve problems and to prove relationships." },
        { code: "HSG-GPE.B.5", description: "Prove the slope criteria for parallel and perpendicular lines." },
        { code: "HSG-MG.A.1", description: "Use geometric shapes, their measures, and their properties to describe objects." }
      ]
    },
    {
      domain: "Statistics & Probability",
      standards: [
        { code: "HSS-ID.A.1", description: "Represent data with plots on the real number line (dot plots, histograms, and box plots)." },
        { code: "HSS-ID.B.6", description: "Represent data on two quantitative variables on a scatter plot and describe how the variables are related." }
      ]
    }
  ]
};

/* -------------------------------------------------------------------------- */
/*                        ENGLISH LANGUAGE ARTS (ELA)                         */
/* -------------------------------------------------------------------------- */
const ELA_STANDARDS: Record<string, StandardCategory[]> = {
  "K": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.K.1", description: "With prompting and support, ask and answer questions about key details in a text." },
        { code: "RL.K.2", description: "With prompting and support, retell familiar stories, including key details." },
        { code: "RL.K.3", description: "With prompting and support, identify characters, settings, and major events in a story." },
        { code: "RL.K.9", description: "With prompting and support, compare and contrast the adventures and experiences of characters in familiar stories." }
      ]
    },
    {
      domain: "Reading: Foundational Skills",
      standards: [
        { code: "RF.K.1", description: "Demonstrate understanding of the organization and basic features of print." },
        { code: "RF.K.2", description: "Demonstrate understanding of spoken words, syllables, and sounds (phonemes)." },
        { code: "RF.K.3", description: "Know and apply grade-level phonics and word analysis skills in decoding words." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.K.1", description: "Use a combination of drawing, dictating, and writing to compose opinion pieces." },
        { code: "W.K.2", description: "Use a combination of drawing, dictating, and writing to compose informative/explanatory texts." }
      ]
    }
  ],
  "1": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.1.1", description: "Ask and answer questions about key details in a text." },
        { code: "RL.1.2", description: "Retell stories, including key details, and demonstrate understanding of their central message or lesson." },
        { code: "RL.1.3", description: "Describe characters, settings, and major events in a story, using key details." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.1.1", description: "Ask and answer questions about key details in a text." },
        { code: "RI.1.2", description: "Identify the main topic and retell key details of a text." }
      ]
    },
    {
      domain: "Reading: Foundational Skills",
      standards: [
        { code: "RF.1.3", description: "Know and apply grade-level phonics and word analysis skills in decoding words." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.1.1", description: "Write opinion pieces in which they introduce the topic or name the book they are writing about, state an opinion, and provide a reason." },
        { code: "W.1.3", description: "Write narratives in which they recount two or more appropriately sequenced events." }
      ]
    }
  ],
  "2": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.2.1", description: "Ask and answer such questions as who, what, where, when, why, and how to demonstrate understanding of key details." },
        { code: "RL.2.2", description: "Recount stories, including fables and folktales from diverse cultures, and determine their central message, lesson, or moral." },
        { code: "RL.2.6", description: "Acknowledge differences in the points of view of characters." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.2.1", description: "Ask and answer such questions as who, what, where, when, why, and how to demonstrate understanding of key details in a text." },
        { code: "RI.2.2", description: "Identify the main topic of a multiparagraph text as well as the focus of specific paragraphs within the text." },
        { code: "RI.2.6", description: "Identify the main purpose of a text, including what the author wants to answer, explain, or describe." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.2.1", description: "Write opinion pieces in which they introduce the topic, state an opinion, and supply reasons." },
        { code: "W.2.2", description: "Write informative/explanatory texts in which they introduce a topic, use facts and definitions to develop points, and provide a concluding statement." }
      ]
    }
  ],
  "3": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.3.1", description: "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers." },
        { code: "RL.3.2", description: "Recount stories, including fables, folktales, and myths from diverse cultures; determine the central message." },
        { code: "RL.3.3", description: "Describe characters in a story (e.g., their traits, motivations, or feelings) and explain how their actions contribute to the sequence of events." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.3.2", description: "Determine the main idea of a text; recount the key details and explain how they support the main idea." },
        { code: "RI.3.3", description: "Describe the relationship between a series of historical events, scientific ideas or concepts, or steps in technical procedures." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.3.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons." },
        { code: "W.3.2", description: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly." }
      ]
    }
  ],
  "4": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.4.1", description: "Refer to details and examples in a text when explaining what the text says explicitly and when drawing inferences." },
        { code: "RL.4.2", description: "Determine a theme of a story, drama, or poem from details in the text; summarize the text." },
        { code: "RL.4.3", description: "Describe in depth a character, setting, or event in a story or drama, drawing on specific details in the text." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.4.1", description: "Refer to details and examples in a text when explaining what the text says explicitly and when drawing inferences from the text." },
        { code: "RI.4.2", description: "Determine the main idea of a text and explain how it is supported by key details; summarize the text." },
        { code: "RI.4.5", description: "Describe the overall structure (e.g., chronology, comparison, cause/effect) of events, ideas, concepts, or information in a text." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.4.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons and information." },
        { code: "W.4.2", description: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly." },
        { code: "W.4.9", description: "Draw evidence from literary or informational texts to support analysis, reflection, and research." }
      ]
    }
  ],
  "5": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.5.1", description: "Quote accurately from a text when explaining what the text says explicitly and when drawing inferences." },
        { code: "RL.5.2", description: "Determine a theme of a story, drama, or poem from details in the text." },
        { code: "RL.5.4", description: "Determine the meaning of words and phrases as they are used in a text, including figurative language." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.5.2", description: "Determine two or more main ideas of a text and explain how they are supported by key details; summarize the text." },
        { code: "RI.5.8", description: "Explain how an author uses reasons and evidence to support particular points in a text." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.5.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons and information." },
        { code: "W.5.2", description: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly." }
      ]
    }
  ],
  "6": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.6.1", description: "Cite textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text." },
        { code: "RL.6.2", description: "Determine a theme or central idea of a text and how it is conveyed through particular details." },
        { code: "RL.6.3", description: "Describe how a particular story's or drama's plot unfolds in a series of episodes as well as how the characters respond or change." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.6.1", description: "Cite textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text." },
        { code: "RI.6.2", description: "Determine a central idea of a text and how it is conveyed through particular details; provide a summary of the text." },
        { code: "RI.6.8", description: "Trace and evaluate the argument and specific claims in a text, distinguishing claims that are supported by reasons and evidence from claims that are not." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.6.1", description: "Write arguments to support claims with clear reasons and relevant evidence." },
        { code: "W.6.2", description: "Write informative/explanatory texts to examine a topic and convey ideas, concepts, and information through the selection, organization, and analysis of relevant content." }
      ]
    }
  ],
  "7": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.7.1", description: "Cite several pieces of textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text." },
        { code: "RL.7.2", description: "Determine a theme or central idea of a text and analyze its development over the course of the text." },
        { code: "RL.7.3", description: "Analyze how particular elements of a story or drama interact (e.g., how setting shapes the characters or plot)." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.7.1", description: "Cite several pieces of textual evidence to support analysis of what the text says explicitly." },
        { code: "RI.7.2", description: "Determine two or more central ideas in a text and analyze their development over the course of the text." },
        { code: "RI.7.6", description: "Determine an author's point of view or purpose in a text and analyze how the author distinguishes his or her position from that of others." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.7.1", description: "Write arguments to support claims with clear reasons and relevant evidence." },
        { code: "W.7.2", description: "Write informative/explanatory texts to examine a topic and convey ideas, concepts, and information clearly." }
      ]
    }
  ],
  "8": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.8.1", description: "Cite the textual evidence that most strongly supports an analysis of what the text says explicitly." },
        { code: "RL.8.2", description: "Determine a theme or central idea of a text and analyze its development over the course of the text." },
        { code: "RL.8.3", description: "Analyze how particular lines of dialogue or incidents in a story or drama propel the action, reveal aspects of a character, or provoke a decision." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.8.1", description: "Cite the textual evidence that most strongly supports an analysis of what the text says explicitly as well as inferences drawn from the text." },
        { code: "RI.8.2", description: "Determine a central idea of a text and analyze its development over the course of the text, including its relationship to supporting ideas." },
        { code: "RI.8.8", description: "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and the evidence is relevant and sufficient." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.8.1", description: "Write arguments to support claims with clear reasons and relevant evidence." },
        { code: "W.8.2", description: "Write informative/explanatory texts to examine a topic and convey ideas, concepts, and information clearly." }
      ]
    }
  ],
  "HS": [
    {
      domain: "Reading: Literature",
      standards: [
        { code: "RL.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly." },
        { code: "RL.9-10.2", description: "Determine a theme or central idea of a text and analyze in detail its development." },
        { code: "RL.11-12.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text." },
        { code: "RL.11-12.2", description: "Determine two or more themes or central ideas of a text and analyze their development over the course of the text." }
      ]
    },
    {
      domain: "Reading: Informational Text",
      standards: [
        { code: "RI.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly." },
        { code: "RI.9-10.6", description: "Determine an author's point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view." },
        { code: "RI.11-12.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly." },
        { code: "RI.11-12.7", description: "Integrate and evaluate multiple sources of information presented in different media or formats." }
      ]
    },
    {
      domain: "Writing",
      standards: [
        { code: "W.9-10.1", description: "Write arguments to support claims in an analysis of substantive topics or texts." },
        { code: "W.9-10.2", description: "Write informative/explanatory texts to examine and convey complex ideas, concepts, and information clearly." },
        { code: "W.11-12.1", description: "Write arguments to support claims in an analysis of substantive topics or texts." },
        { code: "W.11-12.2", description: "Write informative/explanatory texts to examine and convey complex ideas, concepts, and information clearly and accurately." }
      ]
    }
  ]
};

/* -------------------------------------------------------------------------- */
/*                                  SCIENCE (NGSS)                            */
/* -------------------------------------------------------------------------- */
const SCIENCE_STANDARDS: Record<string, StandardCategory[]> = {
  "K": [
    {
      domain: "Physical Science",
      standards: [
        { code: "K-PS2-1", description: "Plan and conduct an investigation to compare the effects of different strengths or different directions of pushes and pulls on the motion of an object." },
        { code: "K-PS2-2", description: "Analyze data to determine if a design solution works as intended to change the speed or direction of an object with a push or a pull." },
        { code: "K-PS3-1", description: "Make observations to determine the effect of sunlight on Earth’s surface." }
      ]
    },
    {
      domain: "Life Science",
      standards: [
        { code: "K-LS1-1", description: "Use observations to describe patterns of what plants and animals (including humans) need to survive." }
      ]
    },
    {
      domain: "Earth Science",
      standards: [
        { code: "K-ESS2-1", description: "Use and share observations of local weather conditions to describe patterns over time." },
        { code: "K-ESS3-3", description: "Communicate solutions that will reduce the impact of humans on the land, water, air, and/or other living things in the local environment." }
      ]
    }
  ],
  "1": [
    {
      domain: "Physical Science",
      standards: [
        { code: "1-PS4-1", description: "Plan and conduct investigations to provide evidence that vibrating materials can make sound and that sound can make materials vibrate." },
        { code: "1-PS4-2", description: "Make observations to construct an evidence-based account that objects can be seen only when illuminated." }
      ]
    },
    {
      domain: "Life Science",
      standards: [
        { code: "1-LS1-1", description: "Use materials to design a solution to a human problem by mimicking how plants and/or animals use their external parts to help them survive, grow, and meet their needs." },
        { code: "1-LS3-1", description: "Make observations to construct an evidence-based account that young plants and animals are like, but not exactly like, their parents." }
      ]
    },
    {
      domain: "Earth Science",
      standards: [
        { code: "1-ESS1-1", description: "Use observations of the sun, moon, and stars to describe patterns that can be predicted." },
        { code: "1-ESS1-2", description: "Make observations at different times of year to relate the amount of daylight to the time of year." }
      ]
    }
  ],
  "2": [
    {
      domain: "Physical Science",
      standards: [
        { code: "2-PS1-1", description: "Plan and conduct an investigation to describe and classify different kinds of materials by their observable properties." },
        { code: "2-PS1-2", description: "Analyze data obtained from testing different materials to determine which materials have the properties that are best suited for an intended purpose." }
      ]
    },
    {
      domain: "Life Science",
      standards: [
        { code: "2-LS2-1", description: "Plan and conduct an investigation to determine if plants need sunlight and water to grow." },
        { code: "2-LS4-1", description: "Make observations of plants and animals to compare the diversity of life in different habitats." }
      ]
    },
    {
      domain: "Earth Science",
      standards: [
        { code: "2-ESS1-1", description: "Use information from several sources to provide evidence that Earth events can occur quickly or slowly." },
        { code: "2-ESS2-1", description: "Compare multiple solutions designed to slow or prevent wind or water from changing the shape of the land." }
      ]
    }
  ],
  "3": [
    {
      domain: "Physical Science",
      standards: [
        { code: "3-PS2-1", description: "Plan and conduct an investigation to provide evidence of the effects of balanced and unbalanced forces on the motion of an object." },
        { code: "3-PS2-3", description: "Ask questions to determine cause and effect relationships of electric or magnetic interactions between two objects not in contact with each other." }
      ]
    },
    {
      domain: "Life Science",
      standards: [
        { code: "3-LS1-1", description: "Develop models to describe that organisms have unique and diverse life cycles but all have in common birth, growth, reproduction, and death." },
        { code: "3-LS3-1", description: "Analyze and interpret data to provide evidence that plants and animals have traits inherited from parents and that variation of these traits exists in a group of similar organisms." },
        { code: "3-LS4-3", description: "Construct an argument with evidence that in a particular habitat some organisms can survive well, some survive less well, and some cannot survive at all." }
      ]
    },
    {
      domain: "Earth Science",
      standards: [
        { code: "3-ESS2-1", description: "Represent data in tables and graphical displays to describe typical weather conditions expected during a particular season." }
      ]
    }
  ],
  "4": [
    {
      domain: "Energy & Waves",
      standards: [
        { code: "4-PS3-1", description: "Use evidence to construct an explanation relating the speed of an object to the energy of that object." },
        { code: "4-PS3-2", description: "Make observations to provide evidence that energy can be transferred from place to place by sound, light, heat, and electric currents." },
        { code: "4-PS4-1", description: "Develop a model of waves to describe patterns in terms of amplitude and wavelength and that waves can cause objects to move." }
      ]
    },
    {
      domain: "Life Science",
      standards: [
        { code: "4-LS1-1", description: "Construct an argument that plants and animals have internal and external structures that function to support survival, growth, behavior, and reproduction." }
      ]
    },
    {
      domain: "Earth Science",
      standards: [
        { code: "4-ESS2-1", description: "Make observations and/or measurements to provide evidence of the effects of weathering or the rate of erosion by water, ice, wind, or vegetation." },
        { code: "4-ESS3-1", description: "Obtain and combine information to describe that energy and fuels are derived from natural resources and their uses affect the environment." }
      ]
    }
  ],
  "5": [
    {
      domain: "Physical Science (Matter)",
      standards: [
        { code: "5-PS1-1", description: "Develop a model to describe that matter is made of particles too small to be seen." },
        { code: "5-PS1-3", description: "Make observations and measurements to identify materials based on their properties." },
        { code: "5-PS1-4", description: "Conduct an investigation to determine whether the mixing of two or more substances results in new substances." }
      ]
    },
    {
      domain: "Life Science (Ecosystems)",
      standards: [
        { code: "5-LS1-1", description: "Support an argument that plants get the materials they need for growth chiefly from air and water." },
        { code: "5-LS2-1", description: "Develop a model to describe the movement of matter among plants, animals, decomposers, and the environment." }
      ]
    },
    {
      domain: "Earth Science (Systems)",
      standards: [
        { code: "5-ESS2-1", description: "Develop a model using an example to describe ways the geosphere, biosphere, hydrosphere, and/or atmosphere interact." },
        { code: "5-ESS1-2", description: "Represent data in graphical displays to reveal patterns of daily changes in length and direction of shadows, day and night, and the seasonal appearance of some stars in the night sky." }
      ]
    }
  ],
  "6": [
    {
      domain: "Structure and Properties of Matter",
      standards: [
        { code: "MS-PS1-1", description: "Develop models to describe the atomic composition of simple molecules and extended structures." },
        { code: "MS-PS1-4", description: "Develop a model that predicts and describes changes in particle motion, temperature, and state of a pure substance when thermal energy is added or removed." }
      ]
    },
    {
      domain: "Cells and Organisms",
      standards: [
        { code: "MS-LS1-1", description: "Conduct an investigation to provide evidence that living things are made of cells; either one cell or many different numbers and types of cells." },
        { code: "MS-LS1-3", description: "Use argument supported by evidence for how the body is a system of interacting subsystems composed of groups of cells." }
      ]
    },
    {
      domain: "Earth's Systems",
      standards: [
        { code: "MS-ESS2-1", description: "Develop a model to describe the cycling of Earth's materials and the flow of energy that drives this process." }
      ]
    }
  ],
  "7": [
    {
      domain: "Energy and Forces",
      standards: [
        { code: "MS-PS2-3", description: "Ask questions about data to determine the factors that affect the strength of electric and magnetic forces." },
        { code: "MS-PS3-1", description: "Construct and interpret graphical displays of data to describe the relationships of kinetic energy to the mass of an object and to the speed of an object." }
      ]
    },
    {
      domain: "Matter and Energy in Organisms",
      standards: [
        { code: "MS-LS1-6", description: "Construct a scientific explanation based on evidence for the role of photosynthesis in the cycling of matter and flow of energy into and out of organisms." },
        { code: "MS-LS2-1", description: "Analyze and interpret data to provide evidence for the effects of resource availability on organisms and populations of organisms in an ecosystem." }
      ]
    },
    {
      domain: "Earth and Human Activity",
      standards: [
        { code: "MS-ESS3-1", description: "Construct a scientific explanation based on evidence for how the uneven distributions of Earth's mineral, energy, and groundwater resources are the result of past and current geoscience processes." }
      ]
    }
  ],
  "8": [
    {
      domain: "Forces and Interactions",
      standards: [
        { code: "MS-PS2-1", description: "Apply Newton's Third Law to design a solution to a problem involving the motion of two colliding objects." },
        { code: "MS-PS2-2", description: "Plan an investigation to provide evidence that the change in an object's motion depends on the sum of the forces on the object and the mass of the object." }
      ]
    },
    {
      domain: "Natural Selection and Adaptations",
      standards: [
        { code: "MS-LS3-1", description: "Develop and use a model to describe why structural changes to genes (mutations) located on chromosomes may affect proteins and may result in harmful, beneficial, or neutral effects to the structure and function of the organism." },
        { code: "MS-LS4-2", description: "Apply scientific ideas to construct an explanation for the anatomical similarities and differences among modern organisms and between modern and fossil organisms to infer evolutionary relationships." }
      ]
    },
    {
      domain: "Space Systems",
      standards: [
        { code: "MS-ESS1-1", description: "Develop and use a model of the Earth-sun-moon system to describe the cyclic patterns of lunar phases, eclipses of the sun and moon, and seasons." }
      ]
    }
  ],
  "HS": [
    {
      domain: "Life Science (Biology)",
      standards: [
        { code: "HS-LS1-1", description: "Construct an explanation based on evidence for how the structure of DNA determines the structure of proteins which carry out the essential functions of life." },
        { code: "HS-LS1-5", description: "Use a model to illustrate how photosynthesis transforms light energy into stored chemical energy." },
        { code: "HS-LS2-1", description: "Use mathematical and/or computational representations to support explanations of factors that affect carrying capacity of ecosystems." },
        { code: "HS-LS3-1", description: "Ask questions to clarify relationships about the role of DNA and chromosomes in coding the instructions for characteristic traits passed from parents to offspring." },
        { code: "HS-LS4-1", description: "Communicate scientific information that common ancestry and biological evolution are supported by multiple lines of empirical evidence." }
      ]
    },
    {
      domain: "Physical Science (Chemistry/Physics)",
      standards: [
        { code: "HS-PS1-1", description: "Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level." },
        { code: "HS-PS1-2", description: "Construct and revise an explanation for the outcome of a simple chemical reaction based on the outermost electron states of atoms." },
        { code: "HS-PS2-1", description: "Analyze data to support the claim that Newton's second law of motion describes the mathematical relationship among the net force on a macroscopic object, its mass, and its acceleration." },
        { code: "HS-PS3-1", description: "Create a computational model to calculate the change in the energy of one component in a system when the change in energy of the other component(s) and energy flows in and out of the system are known." }
      ]
    },
    {
      domain: "Earth and Space Science",
      standards: [
        { code: "HS-ESS1-1", description: "Develop a model based on evidence to illustrate the life span of the sun and the role of nuclear fusion in the sun's core." },
        { code: "HS-ESS2-4", description: "Use a model to describe how variations in the flow of energy into and out of Earth's systems result in changes in climate." }
      ]
    }
  ]
};

/* -------------------------------------------------------------------------- */
/*                                   HISTORY                                  */
/* -------------------------------------------------------------------------- */
const HISTORY_STANDARDS: Record<string, StandardCategory[]> = {
  "K": [{ domain: "Learning to Work Together", standards: [{ code: "K.1", description: "Students understand that being a good citizen involves acting in certain ways." }, { code: "K.3", description: "Students match simple descriptions of work that people do and the names of those jobs." }, { code: "K.6", description: "Students understand that history relates to events, people, and places of other times." }] }],
  "1": [{ domain: "A Child's Place in Time and Space", standards: [{ code: "1.1", description: "Students describe the rights and individual responsibilities of citizenship." }, { code: "1.2", description: "Students compare and contrast the absolute and relative locations of places and people and describe the physical and/or human characteristics of places." }, { code: "1.5", description: "Students describe the human characteristics of familiar places and the varied backgrounds of American citizens and residents." }] }],
  "2": [{ domain: "People Who Make a Difference", standards: [{ code: "2.1", description: "Students differentiate between things that happened long ago and things that happened yesterday." }, { code: "2.2", description: "Students demonstrate map skills by describing the absolute and relative locations of people, places, and environments." }, { code: "2.4", description: "Students understand basic economic concepts and their individual roles in the economy." }] }],
  "3": [{ domain: "Continuity and Change", standards: [{ code: "3.2", description: "Students describe the American Indian nations in their local region long ago and in the recent past." }, { code: "3.3", description: "Students draw from historical and community resources to organize the sequence of local historical events." }, { code: "3.4", description: "Students understand the role of rules and laws in our daily lives and the basic structure of the U.S. government." }] }],
  "4": [{ domain: "California: A Changing State", standards: [{ code: "4.2", description: "Students describe the social, political, cultural, and economic life and interactions among people of California from the pre-Columbian societies to the Spanish mission and Mexican rancho periods." }, { code: "4.3", description: "Students explain the economic, social, and political life in California from the establishment of the Bear Flag Republic through the Mexican-American War, the Gold Rush, and the granting of statehood." }, { code: "4.4", description: "Students explain how California became an agricultural and industrial power." }] }],
  "5": [{ domain: "US History: Making a New Nation", standards: [{ code: "5.5", description: "Students explain the causes of the American Revolution." }, { code: "5.7", description: "Students describe the people and events associated with the development of the U.S. Constitution." }, { code: "5.8", description: "Students trace the colonization, immigration, and settlement patterns of the American people from 1789 to the mid-1800s." }] }],
  "6": [{ domain: "World History: Ancient Civilizations", standards: [{ code: "6.2", description: "Students analyze the geographic, political, economic, religious, and social structures of the early civilizations of Mesopotamia, Egypt, and Kush." }, { code: "6.4", description: "Students analyze the geographic, political, economic, religious, and social structures of the early civilizations of Ancient Greece." }, { code: "6.7", description: "Students analyze the geographic, political, economic, religious, and social structures during the development of Rome." }] }],
  "7": [{ domain: "World History: Medieval and Early Modern", standards: [{ code: "7.2", description: "Students analyze the geographic, political, economic, religious, and social structures of the civilizations of Islam in the Middle Ages." }, { code: "7.6", description: "Students analyze the geographic, political, economic, religious, and social structures of the civilizations of Medieval Europe." }, { code: "7.10", description: "Students analyze the historical developments of the Scientific Revolution and its lasting effect on religious, political, and cultural institutions." }] }],
  "8": [{ domain: "US History: Growth and Conflict", standards: [{ code: "8.1", description: "Students understand the major events preceding the founding of the nation and relate their significance to the development of American constitutional democracy." }, { code: "8.10", description: "Students analyze the multiple causes, key events, and complex consequences of the Civil War." }, { code: "8.12", description: "Students analyze the transformation of the American economy and the changing social and political conditions in the United States in response to the Industrial Revolution." }] }],
  "HS": [
    { domain: "World History (10th)", standards: [{ code: "10.2", description: "Students compare and contrast the Glorious Revolution of England, the American Revolution, and the French Revolution." }, { code: "10.3", description: "Students analyze the effects of the Industrial Revolution in England, France, Germany, Japan, and the United States." }, { code: "10.8", description: "Students analyze the causes and consequences of World War II." }] },
    { domain: "US History (11th)", standards: [{ code: "11.2", description: "Students analyze the relationship among the rise of industrialization, large-scale rural-to-urban migration, and massive immigration from Southern and Eastern Europe." }, { code: "11.10", description: "Students analyze the development of federal civil rights and voting rights." }] },
    { domain: "Government (12th)", standards: [{ code: "12.1", description: "Students explain the fundamental principles and moral values of American democracy as expressed in the U.S. Constitution and other essential documents." }, { code: "12.4", description: "Students analyze the unique roles and responsibilities of the three branches of government." }] }
  ]
};

export const getLocalStandards = (gradeRaw: string, subjectRaw: string): StandardCategory[] => {
  const grade = normalizeGrade(gradeRaw);
  const subject = normalizeSubject(subjectRaw);
  
  if (subject === 'Mathematics') return MATH_STANDARDS[grade] || [];
  if (subject === 'ELA') return ELA_STANDARDS[grade] || [];
  if (subject === 'Science') return SCIENCE_STANDARDS[grade] || [];
  if (subject === 'History') return HISTORY_STANDARDS[grade] || [];
  
  return [];
};