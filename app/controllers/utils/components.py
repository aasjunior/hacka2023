from flask import render_template, session


def render_sidebar():
    image = 'user.jpg'
    return render_template("components/sidebar.html", image=image)


def render_welcome_card(name="Aline", pag=False, titulo=False):
    return render_template("components/welcome-card.html", name=name, pag=pag, titulo=titulo)
  
def render_monthly_record(tecnologia, comunicacao, marketing, outros):
    dados = {
        'tecnologia': tecnologia,
        'comunicacao': comunicacao,
        'marketing': marketing,
        'outros': outros
    }
    return render_template("components/monthly-record.html", **dados)

def render_header_title(titulo_da_pag=False):
    return render_template("components/header-title.html", titulo_da_pag=titulo_da_pag)

def render_progress_bar():
    return render_template("components/progress-bar.html")

components = {
            'sidebar': render_sidebar,
            'welcome_card': render_welcome_card,
            'monthly_record': render_monthly_record,
            'header_title' : render_header_title,
            'progress_bar' : render_progress_bar,
        }