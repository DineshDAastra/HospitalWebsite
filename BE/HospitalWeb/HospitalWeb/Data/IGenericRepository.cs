using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HospitalWeb.Repository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        bool UsePaging { get; set; }
        int PageSize { get; set; }
        int Page { get; set; }
        string Sort { get; set; }
        bool Status { get; set; }
        string SortOrder { get; set; }
        int Count { get; set; }
        string Filter { get; set; }

        Task<TEntity> GetByIdAsync(int id);
        TEntity GetById(int id);
        Task<List<TEntity>> GetAllAsync();
        Task<List<TEntity>> GetAllAsync<TKey>(Expression<Func<TEntity, bool>> predicate,Expression<Func<TEntity,TKey>>orderByDescending);        
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> LastOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, object>> keySelector);
        Task AddAsync(TEntity entity);       
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);   
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);
        Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate);
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter = null,Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool asNoTracking = false);
        Task<List<TEntity>> GetAllWithPagenationAsync(Expression<Func<TEntity, bool>> Predicate);
        Task<decimal> SumAsync(
       Expression<Func<TEntity, bool>> predicate,
       Expression<Func<TEntity, decimal>> selector
   );


        Task<List<TEntity>> GetAllPaginatedAsync(
    Expression<Func<TEntity, bool>> predicate = null,
    int? pageNo = null,
    int? pageSize = null,
    string sortBy = null,
    bool ascending = true);

        IQueryable<TEntity> GetQueryable();


    }
}
