
using HospitalWeb.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;

//using AastraAMS.DTO.Report;

namespace HospitalWeb.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly HospitalContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public bool UsePaging { get; set; } = false;
        public int PageSize { get; set; } = 10;
        public int Page { get; set; } = 1;
        public string Sort { get; set; } = typeof(TEntity).GetProperties().SingleOrDefault(p => p.IsDefined(typeof(KeyAttribute), false))?.Name;
        public string SortOrder { get; set; } = "ASC";
        public int Count { get; set; }
        public bool Status { get; set; } = true;
        public string Filter { get; set; } = string.Empty;

        public GenericRepository(HospitalContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<TEntity>();
        }


        public async Task<TEntity> GetByIdAsync(int id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }
        public TEntity GetById(int id)
        {
            // Use Find method to retrieve the entity by its primary key
            return _dbSet.Find(id); // This will look for the entity with the given id
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                return await _dbSet.FirstOrDefaultAsync(predicate);
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }

        public async Task<decimal> SumAsync(
        Expression<Func<TEntity, bool>> predicate,
        Expression<Func<TEntity, decimal>> selector
    )
        {
            return await _dbSet
                .Where(predicate)
                .SumAsync(selector);
        }


        public async Task<TEntity> LastOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, object>> keySelector)
        {
            try
            {
                return await _dbSet.Where(predicate).OrderByDescending(keySelector).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            try
            {
                return await _dbSet.ToListAsync();
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }

        public async Task<List<TEntity>> GetAllAsync<TKey>(Expression<Func<TEntity, bool>> predicate,Expression<Func<TEntity,TKey>>orderByDescending)
        {
            try
            {
                return await _dbSet.Where(predicate)
                                   .OrderByDescending(orderByDescending)
                                   .ToListAsync();
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }
        public async Task AddAsync(TEntity entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }

        //public async Task UpdateAsync(TEntity entity)
        //{
        //    try
        //    {
        //        _context.Entry(entity).State = EntityState.Modified;
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError("Error updating entity of type {type}: {message}", typeof(TEntity).Name, ex.Message);
        //        throw; // Re-throw the exception for handling at a higher level
        //    }
        //}


        // Prakash code to Update the GateMap in Repository
        public async Task UpdateAsync(TEntity entity)
        {
            try
            {
                // Check if the entity is already tracked
                var trackedEntity = _context.Set<TEntity>().Local.FirstOrDefault(e => e.Equals(entity));

                if (trackedEntity != null)
                {
                    // Detach the existing tracked entity to avoid conflicts
                    _context.Entry(trackedEntity).State = EntityState.Detached;
                }

                // Attach the updated entity and mark it as modified
                _context.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;

                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException concurrencyEx)
            {
                throw new InvalidOperationException("Concurrency conflict detected. Please try again.", concurrencyEx);
            }
            catch (DbUpdateException dbEx)
            {
                throw new InvalidOperationException("Database error occurred while updating the entity.", dbEx);
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }


        public async Task DeleteAsync(TEntity entity)
        {
            try
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }
        
        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                return await _dbSet.AnyAsync(predicate);
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }

        public async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                return await _dbSet.CountAsync(predicate);
            }
            catch (Exception ex)
            {
                throw; // Re-throw the exception for handling at a higher level
            }
        }


        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool asNoTracking = false)
        {
            try
            {
                IQueryable<TEntity> query = _dbSet;

                if (filter != null)
                {
                    query = query.Where(filter);
                }

                if (include != null)
                {
                    query = include(query);
                }
                if (asNoTracking)
                {
                    query = query.AsNoTracking();
                }
                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

       
        private Expression<Func<TEntity, TResult>> SortExpression<TResult>(string SortProperty, ParameterExpression Param)
        {
            return (Expression<Func<TEntity, TResult>>)GetSortExpression(SortProperty);
        }

        private LambdaExpression GetSortExpression(string Property)
        {
            LambdaExpression Result;
            string[] Properties = Property.Split('.');
            Type Type = typeof(TEntity);
            ParameterExpression Param = Expression.Parameter(Type, "o");
            Expression Expr = Param;
            foreach (string Prop in Properties)
            {
                PropertyInfo PropInfo = Type.GetProperty(Prop);
                Expr = Expression.Property(Expr, PropInfo);
                Type = PropInfo.PropertyType;
            }

            Type DelegateType = typeof(Func<,>).MakeGenericType(typeof(TEntity), Type);
            Result = Expression.Lambda(DelegateType, Expr, Param);

            return Result;
        }

        private PropertyInfo GetProperty(string SortProperty, ref ParameterExpression Param)
        {
            if (!string.IsNullOrEmpty(SortProperty))
            {
                string[] Properties = SortProperty.Split('.');
                Type Type = typeof(TEntity);
                PropertyInfo PropInfo = null;
                Param = Expression.Parameter(Type, "o");
                Expression Expr = Param;
                foreach (string Prop in Properties)
                {
                    PropInfo = Type.GetProperty(Prop);
                    Expr = Expression.Property(Expr, PropInfo);
                    Type = PropInfo.PropertyType;
                }

                return PropInfo;
            }

            return null;
        }

        public async Task<List<TEntity>> GetAllWithPagenationAsync(Expression<Func<TEntity, bool>> Predicate)
        {
            try
            {

                IQueryable<TEntity> QueryResult = null;
                ParameterExpression Param = null;
                var PropertyInfo = GetProperty(Sort, ref Param);
                if (SortOrder == "DESC")
                    QueryResult =
                              PropertyInfo.PropertyType == typeof(long) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<long>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<long>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<long>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Int64) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Int64>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(int) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<int>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<int>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<int>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(string) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<string>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(double) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<double>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<double>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<double>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(decimal) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<decimal>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<decimal>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<decimal>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(float) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<float>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<float>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<float>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(DateTime) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<DateTime>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<DateTime>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<DateTime>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(TimeSpan) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<TimeSpan>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(bool) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<bool>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<bool>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<bool>>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Guid) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Guid>(Sort, Param)).AsQueryable() :
                              PropertyInfo.PropertyType == typeof(Nullable<Guid>) ? _dbSet.Where(Predicate).OrderByDescending(SortExpression<Nullable<Guid>>(Sort, Param)).AsQueryable() : _dbSet.AsQueryable();
                else
                    QueryResult =
                            PropertyInfo.PropertyType == typeof(long) ? _dbSet.Where(Predicate).OrderBy(SortExpression<long>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<long>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<long>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Int64) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Int64>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(int) ? _dbSet.Where(Predicate).OrderBy(SortExpression<int>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<int>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<int>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(decimal) ? _dbSet.Where(Predicate).OrderBy(SortExpression<decimal>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<decimal>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<decimal>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(string) ? _dbSet.Where(Predicate).OrderBy(SortExpression<string>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(double) ? _dbSet.Where(Predicate).OrderBy(SortExpression<double>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<double>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<double>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(float) ? _dbSet.Where(Predicate).OrderBy(SortExpression<float>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<float>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<float>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(DateTime) ? _dbSet.Where(Predicate).OrderBy(SortExpression<DateTime>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<DateTime>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<DateTime>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(TimeSpan) ? _dbSet.Where(Predicate).OrderBy(SortExpression<TimeSpan>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(bool) ? _dbSet.Where(Predicate).OrderBy(SortExpression<bool>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Nullable<bool>) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Nullable<bool>>(Sort, Param)).AsQueryable() :
                            PropertyInfo.PropertyType == typeof(Guid) ? _dbSet.Where(Predicate).OrderBy(SortExpression<Guid>(Sort, Param)).AsQueryable() : _dbSet.AsQueryable();

                Count = QueryResult.Count();

                if (UsePaging)
                {
                    return QueryResult.Skip((Page - 1) * PageSize).Take(PageSize).AsQueryable().ToList();
                }
                else
                {
                    return QueryResult.ToList();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }




        public async Task<List<TEntity>> GetAllPaginatedAsync(
     Expression<Func<TEntity, bool>> predicate = null,
     int? pageNo = null,
     int? pageSize = null,
     string sortBy = null,
     bool ascending = true)
        {
            var query = _dbSet.AsQueryable();

            // Apply filters
            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var parameter = Expression.Parameter(typeof(TEntity), "p");
                var property = Expression.Property(parameter, sortBy);
                var lambda = Expression.Lambda(property, parameter);

                var method = ascending ? "OrderBy" : "OrderByDescending";
                var result = Expression.Call(
                    typeof(Queryable),
                    method,
                    new Type[] { typeof(TEntity), property.Type },
                    query.Expression,
                    lambda
                );

                query = query.Provider.CreateQuery<TEntity>(result);
            }

            // Apply pagination if pageNo and pageSize are provided
            if (pageNo.HasValue && pageSize.HasValue)
            {
                query = query
                    .Skip((pageNo.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }


        public IQueryable<TEntity> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }

       
    }
}
