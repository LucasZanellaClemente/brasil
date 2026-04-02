

## Fix: Imagens invertidas + nova foto amarela

### Problema
Os arquivos de imagem estão trocados — `camisa-amarela-1.jpeg` contém a foto da camisa azul e vice-versa. O código (badges/nomes) está correto, mas as fotos estão invertidas.

### Solução

1. **Copiar a nova foto amarela** enviada pelo usuário (`WhatsApp_Image_2026-04-02_at_10.32.20_4.jpeg`) para `src/assets/` como a foto principal da camisa amarela.

2. **Trocar as imagens entre os assets**: As fotos que estão em `camisa-amarela-*.jpeg` (que na verdade são azuis) precisam ir para `camisa-azul-*.jpeg`, e vice-versa. Verificar cada arquivo e reorganizar corretamente.

3. **Garantir que o mapeamento em `PRODUCT_IMAGES`** no `Index.tsx` continue apontando para os imports corretos após a reorganização.

### Arquivos alterados
- `src/assets/camisa-amarela-1.jpeg` — substituir pela nova foto amarela enviada
- Reorganizar os demais assets conforme necessário
- Possível ajuste nos imports do `Index.tsx` se nomes mudarem

