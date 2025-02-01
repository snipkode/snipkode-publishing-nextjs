-- View untuk menjumlahkan semua saldo user berdasarkan user_id
create view user_balances as
select user_id, sum(amount) as total_balance
from royalties
group by user_id;

-- View untuk menjumlahkan total saldo masuk platform
create view platform_total_balance as
select sum(amount) as total_balance
from royalties;