'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useLanguage } from '@/hooks/use-language';
import { generateProductIdeaAction, type IdeaGeneratorState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function SubmitButton() {
  const { t } = useLanguage();
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
      {t('idea_generator_button')}
    </Button>
  );
}

function IdeaResult({ data }: { data: IdeaGeneratorState['data'] }) {
  const { t } = useLanguage();

  if (!data) return null;

  return (
    <Card className="bg-card/50 border border-border/50 animate-fade-in">
      <CardHeader>
        <CardTitle className="font-headline text-2xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          {data.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">{t('idea_generator_result_desc')}</h3>
          <p className="text-muted-foreground">{data.detailedDescription}</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{t('idea_generator_result_features')}</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {data.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{t('idea_generator_result_materials')}</h3>
          <div className="flex flex-wrap gap-2">
            {data.materials.map((material, i) => (
              <Badge key={i} variant="secondary">{material}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function IdeaGeneratorPage() {
  const { t } = useLanguage();
  const initialState: IdeaGeneratorState = {
    data: null,
    message: '',
    status: 'idle',
  };

  const [state, formAction] = useActionState(generateProductIdeaAction, initialState);

  return (
    <div className="container mx-auto px-4 py-12 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('idea_generator_title')}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {t('idea_generator_subtitle')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-12 grid gap-8">
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-lg font-semibold mb-2 block">
              {t('idea_generator_label')}
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('idea_generator_placeholder')}
              required
              className="min-h-[100px] text-base"
            />
          </div>
          <SubmitButton />
        </form>

        {state.status === 'error' && (
          <p className="text-center text-destructive">{state.message}</p>
        )}
        
        {state.status === 'success' && state.data && <IdeaResult data={state.data} />}
      </div>
    </div>
  );
}
