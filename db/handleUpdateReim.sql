CREATE TEMPORARY TABLE temp_total_sum AS

SELECT acaraId, userId, SUM(nominal) AS current_sum
FROM reimbursements
WHERE acaraId = 16 AND (status = "Disetujui" OR status = "Diajukan")
GROUP BY acaraId, userId;

UPDATE reimbursements rm
JOIN temp_total_sum t ON rm.acaraId = t.acaraId AND rm.userId = t.userId
SET rm.nominal = rm.nominal * 25000 / t.current_sum
WHERE rm.acaraId = 16 AND (rm.status = "Disetujui" OR rm.status = "Diajukan");

DROP TEMPORARY TABLE temp_total_sum;
