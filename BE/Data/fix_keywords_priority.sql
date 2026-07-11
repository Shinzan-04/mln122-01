SET client_encoding = 'UTF8';
-- Thêm keyword dài hơn cho "4 nhân tố" để override "tich luy tu ban"
UPDATE "ChatbotQAs" 
SET "Keyword" = '4 nhan to,bon nhan to,quy mo tich luy,4 nhan to anh huong'
WHERE "Id" = 11;

-- Thêm keyword dài hơn cho "hệ quả xã hội" để override "tich luy tu ban"
UPDATE "ChatbotQAs"
SET "Keyword" = 'he qua xa hoi,he qua cua tich luy,he qua tich luy tu ban,he qua xa hoi cua tich luy'
WHERE "Id" = 9;