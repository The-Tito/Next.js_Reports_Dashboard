-- ============================================
-- Minimo 5 Views
-- ============================================



-- ============================================
-- VIEW_1 - Definición de VIEW 1
-- ============================================
-- Qué devuelve: 
-- Grain (qué representa una fila): 
-- Métricas:
-- Por qué usa GROUP BY/HAVING:
-- 1–2 queries VERIFY para validar resultados
-- ============================================

/*
Cada view debe incluir:
    al menos 1 función agregada (SUM/COUNT/AVG/MIN/MAX)
    GROUP BY
    al menos 1 campo calculado (ratio, %, promedio, COALESCE o CASE)

Al menos 2 views deben usar HAVING.
Al menos 2 views deben usar CASE o COALESCE de forma significativa.
Al menos 1 view debe usar CTE ( WITH ... ).
Al menos 1 view debe usar Window Function (ROW_NUMBER / RANK / SUM OVER / etc.).
En mínimo 2 views no se permite SELECT * (deben listar columnas + aliases legibles).
*/