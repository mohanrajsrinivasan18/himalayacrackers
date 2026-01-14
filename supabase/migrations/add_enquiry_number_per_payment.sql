-- Add 'per' column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS per text DEFAULT 'pkt';

-- Add enquiry_number and payment_method to enquiries table
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS enquiry_number text UNIQUE;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS payment_method text;

-- Create enquiry counter table
CREATE TABLE IF NOT EXISTS enquiry_counter (
  id int PRIMARY KEY,
  current_number int
);

-- Initialize counter if not exists
INSERT INTO enquiry_counter (id, current_number) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

-- Function to generate enquiry number
CREATE OR REPLACE FUNCTION generate_enquiry_number()
RETURNS text AS $$
DECLARE
  new_number int;
  enquiry_num text;
BEGIN
  UPDATE enquiry_counter SET current_number = current_number + 1 WHERE id = 1 RETURNING current_number INTO new_number;
  enquiry_num := 'ENQ' || to_char(now(), 'YYYY') || lpad(new_number::text, 6, '0');
  RETURN enquiry_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-generate enquiry number
CREATE OR REPLACE FUNCTION set_enquiry_number()
RETURNS trigger AS $$
BEGIN
  IF NEW.enquiry_number IS NULL THEN
    NEW.enquiry_number := generate_enquiry_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS before_insert_enquiry ON enquiries;
CREATE TRIGGER before_insert_enquiry
  BEFORE INSERT ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION set_enquiry_number();

-- Update existing enquiries with enquiry numbers
DO $$
DECLARE
  enq RECORD;
BEGIN
  FOR enq IN SELECT id FROM enquiries WHERE enquiry_number IS NULL ORDER BY created_at
  LOOP
    UPDATE enquiries SET enquiry_number = generate_enquiry_number() WHERE id = enq.id;
  END LOOP;
END $$;
