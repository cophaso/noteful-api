BEGIN; 

TRUNCATE
  notes,
  folders
  RESTART IDENTITY CASCADE;

INSERT INTO folders (name)
VALUES
  ( 'Cake' ),
  ( 'Pie' ),
  ( 'Ice Cream' );

INSERT INTO notes (name, folder_id, content)
VALUES 
    ( 'Dogs', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    ( 'Cats', 2, 'Vivamus euismod turpis vehicula ultrices fermentum.'),
    ( 'Pigs', 3, 'Nam non sapien id turpis fringilla porta quis vitae lectus.'),
    ( 'Birds', 1, 'Curabitur sodales risus ac urna condimentum, id tincidunt justo consectetur.'),
    ( 'Bears', 2, 'Donec efficitur ligula vitae augue mollis porta.'),
    ( 'Horses', 3, 'Aliquam venenatis risus eget nunc vehicula ornare.'),
    ( 'Tigers', 3, 'Nunc sed leo sit amet dui viverra porta.'),
    ( 'Wolves', 2, 'Etiam tempor nisl sit amet sagittis ullamcorper.'),
    ( 'Elephants', 1, 'Ut faucibus quam eu consequat dapibus.'),
    ( 'Lions', 2, 'Aenean a lorem vitae arcu auctor gravida ac a orci.'),
    ( 'Monkeys', 3, 'Suspendisse commodo diam ut nunc facilisis mattis.'),
    ( 'Bats', 2, 'Praesent id felis congue, bibendum nisl vitae, lobortis nibh.'),
    ( 'Turtles', 3, 'Donec sit amet lectus a nisl eleifend vulputate.'),
    ( 'Zebras', 1, 'Sed vitae libero at ligula ultrices molestie.');

COMMIT;  