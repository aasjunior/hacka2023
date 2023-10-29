from datetime import datetime
import pandas as pd

def consultar_ocorrencias_mensal(db):
    # Data e hora atuais
    agora = datetime.now()

    # Inicializar contadores
    taxa_ocorrencias = [2, 6, 8, 5, 10, 9, 7, 4, 3, 1, 12, 11, 6]
    taxa_concientizacao = [10, 5, 3, 8, 6, 4, 11, 9, 7, 2, 12, 1, 6]

    inicio_mes = datetime(agora.year, agora.month, 1)
    fim_mes = datetime(agora.year + (agora.month // 12), (agora.month % 12) + 1, 1)

    semanas_mes = pd.date_range(start=inicio_mes, end=fim_mes, freq='W')

    # for semana in semanas_mes:
    #     inicio_semana = semana
    #     fim_semana = semana + pd.DateOffset(days=6)

    #     total_ocorrencia = db.Ocurrency.count_documents({})
    #     total_concientizados = db.Ocurrency.count_documents({"concluded": True, "data_registro": {"$gte": inicio_semana, "$lte": fim_semana}})
    #     print(f'\n\nTOTAL OCORRENCIAS: {total_ocorrencia}\n\n')
    #     print(f'\n\nTOTAL CONCIENTIZADOS: {total_concientizados}\n\n')
    #     print(f'\n\nFIM DE SEMANA: {fim_semana}\n\n')
    #     taxa_ocorrencias.append(total_ocorrencia)
    #     taxa_concientizacao.append(total_concientizados)

    return {
        "taxa_ocorrencias": taxa_ocorrencias,
        "taxa_concientizacao": taxa_concientizacao,
    }
