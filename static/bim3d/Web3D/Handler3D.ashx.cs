using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Http.Results;

namespace Web3D
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler3D : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //string str1 = HttpContext.Current.Request.QueryString["action"];
            string str = context.Request.QueryString["action"];
            switch (str)
            {
                case "getbiminfo":
                    GetBininfo(context);
                    break;
            }
        }

        public void GetBininfo(HttpContext context)
        {
            string sql = "select *  from  T_BimMessage";
            StringBuilder sb = new StringBuilder();
            List<string> list = new List<string>();
            DataTable dt = SqlHelper.ExecuteDataTable(sql, CommandType.Text);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                list.Add("\"" + dt.Rows[i]["bim_uid"] +"\":\"" +dt.Rows[i]["bim_xmlvalue"].ToString().Replace("\"{", "'{").Replace("}\"", "}'") + "\"");
            }
            sb.Append("{");
            sb.Append(string.Join(",", list));
            sb.Append("}");
            //IList<T_Biminfo> model = ModelConvert<T_Biminfo>.ConvertToModel(dt);
            //string json = JsonConvert.SerializeObject(model);
            context.Response.Write(sb);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    public class T_Biminfo
    {
        public int ID { get; set; }
        public string bim_uid { get; set; }
        public string bim_xmlid { get; set; }
    }

    public class ModelConvert<Table> where Table : new()
    {
        public static IList<Table> ConvertToModel(DataTable dt)
        {
            // 定义集合    
            IList<Table> Its = new List<Table>();
            // 获得此模型的类型   
            Type type = typeof(Table);
            string tempName = "";
            foreach (DataRow dr in dt.Rows)
            {
                Table Tb = new Table();
                // 获得此模型的公共属性      
                PropertyInfo[] propertys = Tb.GetType().GetProperties();
                foreach (PropertyInfo Pi in propertys)
                {
                    tempName = Pi.Name;  // 检查DataTable是否包含此列    
                    if (dt.Columns.Contains(tempName))
                    {
                        // 判断此属性是否有Setter      
                        if (!Pi.CanWrite) continue;
                        object value = dr[tempName];
                        if (value != DBNull.Value)
                            Pi.SetValue(Tb, value, null);
                    }
                }
                Its.Add(Tb);
            }
            return Its;
        }
    }
}