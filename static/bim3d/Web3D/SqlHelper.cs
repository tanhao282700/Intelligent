using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

public static class SqlHelper
{
    //创建连接字符串
    //Web程序使用WebConfigurationManager(System.Web.Configuration.WebConfigurationManager)
    //桌面程序使用ConfigurationManager(System.Configuration.ConfigurationManager)
    private static readonly string constr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["msSql"].ConnectionString;
    //增，删，改操作
    public static int ExecuteNonQuery(string sql, CommandType cmdtype, params SqlParameter[] pms)
    {
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                cmd.CommandType = cmdtype;
                if (pms != null)
                {
                    cmd.Parameters.AddRange(pms);
                }
                con.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
    //查询单行单列数据
    public static object ExecuteScalar(string sql, CommandType cmdtype, params SqlParameter[] pms)
    {
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                cmd.CommandType = cmdtype;
                if (pms != null)
                {
                    cmd.Parameters.AddRange(pms);
                }
                con.Open();
                return cmd.ExecuteScalar();
            }
        }
    }
    //查询多行多列数据
    public static SqlDataReader ExecuteReader(string sql, CommandType cmdtype, params SqlParameter[] pms)
    {
        SqlConnection con = new SqlConnection(constr);
        using (SqlCommand cmd = new SqlCommand(sql, con))
        {
            cmd.CommandType = cmdtype;
            if (pms != null)
            {
                cmd.Parameters.AddRange(pms);
            }
            //System.Data.CommandBehavior.CloseConnection这个枚举参数表示使用完SqlDataReader后，在关闭reader同时关闭SqlDataReader关联的SqlConnection对象
            //使用try语句保障在return异常时会关闭SqlConnection对象
            try
            {
                con.Open();
                return cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
            }
            catch
            {
                con.Close();
                con.Dispose();
                throw;
            }
        }
    }
    //查询多行多列返回table数据类型
    public static DataTable ExecuteDataTable(string sql, CommandType cmdtype, params SqlParameter[] pms)
    {
        DataTable dt = new DataTable();
        using (SqlDataAdapter da = new SqlDataAdapter(sql, constr))
        {
            da.SelectCommand.CommandType = cmdtype;
            if (pms != null)
            {
                da.SelectCommand.Parameters.AddRange(pms);
            }
            da.Fill(dt);
        }
        return dt;
    }
}