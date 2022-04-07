
    public class Repositorio<T> : Irepositorio<T> where T : Entidade
    {
        public IList<T> PesquisarTodos()
        {
            using (var context = new GenericContext<T>())
            {
                var all = context.Entity.OrderBy(x => x.Id).ToList();
                return all;
            }
        }

        public IList<T> PesquisarPorId(long id)
        {
            using (var context = new GenericContext<T>())
            {
                var all = context.Entity.Where(x => x.Id == id).OrderBy(x => x.Id).ToList();
                return all;
            }
        }

        public void Inserir(T entity)
        {
            using (var context = new GenericContext<T>())
            {
                context.Entity.Add(entity);
                context.SaveChanges();
            }
        }

        public void InserirVarios(List<T> entities)
        {
            using (var context = new GenericContext<T>())
            {
                context.Entity.AddRange(entities);
                context.SaveChanges();
            }
        }

        public void Atualizar(T entity)
        {
            using (var context = new GenericContext<T>())
            {
                context.Update(entity);
                context.SaveChanges();
            }
        }

        public void AtualizarVarios(List<T> entities)
        {
            using (var context = new GenericContext<T>())
            {
                context.UpdateRange(entities);
                context.SaveChanges();
            }
        }

        public void Excluir(T entity)
        {
            using (var context = new GenericContext<T>())
            {
                context.Remove(entity);
                context.SaveChanges();
            }
        }

        public void ExcluirVarios(List<T> entities)
        {
            using (var context = new GenericContext<T>())
            {
                context.RemoveRange(entities);
                context.SaveChanges();
            }
        }
    }
